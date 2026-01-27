from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone, timedelta
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout,
    CheckoutSessionResponse,
    CheckoutStatusResponse,
    CheckoutSessionRequest
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class BookingCreate(BaseModel):
    date: str
    start_time: str
    end_time: str
    pickup_location: str
    dropoff_location: str
    full_name: str
    email: EmailStr
    phone: str
    duration_hours: float
    total_price: float
    deposit_amount: float

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    date: str
    start_time: str
    end_time: str
    pickup_location: str
    dropoff_location: str
    full_name: str
    email: str
    phone: str
    duration_hours: float
    total_price: float
    deposit_amount: float
    payment_status: str = "pending"
    session_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    booking_id: str
    amount: float
    currency: str = "usd"
    payment_status: str = "pending"
    metadata: Optional[Dict] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CheckoutRequest(BaseModel):
    booking_id: str
    origin_url: str


# Utility function to parse time string to minutes
def time_to_minutes(time_str: str) -> int:
    """Convert time string like '09:00 AM' to minutes since midnight"""
    time_part, period = time_str.rsplit(' ', 1)
    hours, minutes = map(int, time_part.split(':'))
    
    if period == 'PM' and hours != 12:
        hours += 12
    elif period == 'AM' and hours == 12:
        hours = 0
    
    return hours * 60 + minutes

def minutes_to_time(minutes: int) -> str:
    """Convert minutes since midnight to time string like '09:00 AM'"""
    hours = minutes // 60
    mins = minutes % 60
    period = 'AM' if hours < 12 else 'PM'
    
    if hours == 0:
        hours = 12
    elif hours > 12:
        hours -= 12
    
    return f"{hours:02d}:{mins:02d} {period}"


# Booking Routes
@api_router.post("/bookings", response_model=Booking, status_code=201)
async def create_booking(booking_input: BookingCreate):
    # Validate minimum 2 hours
    if booking_input.duration_hours < 2:
        raise HTTPException(status_code=400, detail="Minimum booking duration is 2 hours")
    
    # Create booking object
    booking_dict = booking_input.model_dump()
    booking_obj = Booking(**booking_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings(date: Optional[str] = None):
    query = {}
    if date:
        query['date'] = date
    
    bookings = await db.bookings.find(query, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings

@api_router.get("/bookings/check-availability")
async def check_availability(date: str, start_time: str, end_time: str):
    """Check if a time slot is available considering buffer time"""
    bookings = await db.bookings.find(
        {"date": date, "payment_status": {"$in": ["paid", "pending"]}},
        {"_id": 0}
    ).to_list(1000)
    
    requested_start = time_to_minutes(start_time)
    requested_end = time_to_minutes(end_time)
    
    for booking in bookings:
        booking_start = time_to_minutes(booking['start_time'])
        booking_end = time_to_minutes(booking['end_time'])
        # Add 1.5 hour (90 minutes) buffer after booking
        booking_end_with_buffer = booking_end + 90
        
        # Check for overlap
        if not (requested_end <= booking_start or requested_start >= booking_end_with_buffer):
            return {
                "available": False,
                "message": f"Time slot conflicts with existing booking. Vehicle available after {minutes_to_time(booking_end_with_buffer)}"
            }
    
    return {"available": True, "message": "Time slot is available"}


# Contact Routes
@api_router.post("/contact", response_model=ContactSubmission, status_code=201)
async def create_contact(contact_input: ContactCreate):
    contact_dict = contact_input.model_dump()
    contact_obj = ContactSubmission(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.contact_submissions.insert_one(doc)
    return contact_obj


# Payment Routes
@api_router.post("/payments/checkout")
async def create_checkout_session(checkout_req: CheckoutRequest, request: Request):
    """Create Stripe checkout session for 50% deposit"""
    # Get booking
    booking = await db.bookings.find_one({"id": checkout_req.booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Check if already paid
    if booking.get('payment_status') == 'paid':
        raise HTTPException(status_code=400, detail="Booking already paid")
    
    # Initialize Stripe
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    if not stripe_api_key:
        raise HTTPException(status_code=500, detail="Stripe API key not configured")
    
    host_url = checkout_req.origin_url
    webhook_url = f"{str(request.base_url).rstrip('/')}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url=webhook_url)
    
    # Create checkout session
    deposit_amount = float(booking['deposit_amount'])
    success_url = f"{host_url}/booking-success?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{host_url}/booking"
    
    checkout_request = CheckoutSessionRequest(
        amount=deposit_amount,
        currency="usd",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "booking_id": checkout_req.booking_id,
            "customer_email": booking['email'],
            "customer_name": booking['full_name']
        }
    )
    
    session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    
    # Create payment transaction record
    payment_doc = {
        "id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "booking_id": checkout_req.booking_id,
        "amount": deposit_amount,
        "currency": "usd",
        "payment_status": "pending",
        "metadata": checkout_request.metadata,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    await db.payment_transactions.insert_one(payment_doc)
    
    # Update booking with session_id
    await db.bookings.update_one(
        {"id": checkout_req.booking_id},
        {"$set": {"session_id": session.session_id}}
    )
    
    return {"url": session.url, "session_id": session.session_id}

@api_router.get("/payments/status/{session_id}")
async def get_payment_status(session_id: str):
    """Get payment status from Stripe"""
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    if not stripe_api_key:
        raise HTTPException(status_code=500, detail="Stripe API key not configured")
    
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
    
    try:
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update payment transaction if paid and not already updated
        if checkout_status.payment_status == "paid":
            payment_txn = await db.payment_transactions.find_one(
                {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                {"_id": 0}
            )
            
            if payment_txn:
                # Update payment transaction
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "payment_status": "paid",
                            "updated_at": datetime.now(timezone.utc).isoformat()
                        }
                    }
                )
                
                # Update booking
                await db.bookings.update_one(
                    {"session_id": session_id},
                    {"$set": {"payment_status": "paid"}}
                )
        
        return {
            "status": checkout_status.status,
            "payment_status": checkout_status.payment_status,
            "amount_total": checkout_status.amount_total,
            "currency": checkout_status.currency
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    stripe_api_key = os.environ.get('STRIPE_API_KEY')
    if not stripe_api_key:
        raise HTTPException(status_code=500, detail="Stripe API key not configured")
    
    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    
    stripe_checkout = StripeCheckout(api_key=stripe_api_key, webhook_url="")
    
    try:
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        if webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            
            # Check if already processed
            payment_txn = await db.payment_transactions.find_one(
                {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                {"_id": 0}
            )
            
            if payment_txn:
                # Update payment transaction
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "payment_status": "paid",
                            "updated_at": datetime.now(timezone.utc).isoformat()
                        }
                    }
                )
                
                # Update booking
                await db.bookings.update_one(
                    {"session_id": session_id},
                    {"$set": {"payment_status": "paid"}}
                )
        
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# Root route
@api_router.get("/")
async def root():
    return {"message": "Atlanta Luxury Chauffeur Service API"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
