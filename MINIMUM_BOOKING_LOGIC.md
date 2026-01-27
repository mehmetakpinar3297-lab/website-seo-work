# Minimum 2-Hour Booking Logic Implementation

## Overview
The system enforces a minimum 2-hour booking while displaying the actual selected duration transparently to customers.

## Implementation Details

### Frontend Logic (`/app/frontend/src/pages/Booking.js`)

#### 1. Calculation Hook
```javascript
useEffect(() => {
  if (formData.startTime && formData.endTime) {
    const duration = calculateDuration(formData.startTime, formData.endTime);
    // Enforce minimum 2 hours for billing
    const billingDuration = Math.max(MIN_HOURS, duration);
    const total = billingDuration * HOURLY_RATE;
    const deposit = total * 0.5;

    setCalculation({
      durationHours: duration,           // Actual selected duration
      billingDuration: billingDuration,  // Enforced minimum (2 hours)
      totalPrice: total,                 // Based on billing duration
      depositAmount: deposit             // 50% of total
    });
  }
}, [formData.startTime, formData.endTime]);
```

#### 2. Display Logic
The booking summary shows:
- **Selected Duration**: What the customer actually chose (e.g., 1 hour)
- **Minimum Enforcement Notice**: If duration < 2 hours, shows yellow alert box
- **Billing Duration**: Always minimum 2 hours (displayed when enforced)
- **Total**: Calculated as `$75 × billingDuration`
- **50% Deposit**: Half of the total amount

### Backend Validation (`/app/backend/server.py`)

```python
@api_router.post("/bookings", response_model=Booking, status_code=201)
async def create_booking(booking_input: BookingCreate):
    # Enforce minimum 2 hours for billing (backend validation)
    if booking_input.duration_hours < 2:
        booking_input.duration_hours = 2
        booking_input.total_price = 2 * 75
        booking_input.deposit_amount = booking_input.total_price * 0.5
    # ... rest of logic
```

## Examples

### Case 1: Customer Selects 1 Hour (9:00 AM - 10:00 AM)
```
Selected Duration: 1.00 hrs
⚠️ Minimum 2 hours enforced - Billing: 2 hours
Rate: $75/hour
Billing Duration: 2.00 hrs
Total: $150.00
50% Deposit: $75.00 (Due now)
```

### Case 2: Customer Selects 2 Hours (9:00 AM - 11:00 AM)
```
Selected Duration: 2.00 hrs
Rate: $75/hour
Billing Duration: 2.00 hrs
Total: $150.00
50% Deposit: $75.00 (Due now)
```

### Case 3: Customer Selects 3 Hours (9:00 AM - 12:00 PM)
```
Selected Duration: 3.00 hrs
Rate: $75/hour
Billing Duration: 3.00 hrs
Total: $225.00
50% Deposit: $112.50 (Due now)
```

### Case 4: Customer Selects 1.5 Hours (9:00 AM - 10:30 AM)
```
Selected Duration: 1.50 hrs
⚠️ Minimum 2 hours enforced - Billing: 2 hours
Rate: $75/hour
Billing Duration: 2.00 hrs
Total: $150.00
50% Deposit: $75.00 (Due now)
```

## User Experience

1. **Transparency**: Customer sees exactly what they selected
2. **Clear Enforcement**: Yellow notice box appears when minimum is enforced
3. **No Surprise Charges**: Billing duration clearly displayed before payment
4. **Professional**: Maintains luxury brand standards with clear communication

## Payment Flow

1. Customer selects time slots (any duration allowed)
2. System calculates billing duration (minimum 2 hours)
3. Total and deposit calculated based on billing duration
4. Customer proceeds to Stripe checkout with correct amount
5. Backend validates and stores booking with enforced minimum
6. Database stores `duration_hours: 2` (minimum) even if 1 hour selected

## Notes

- ✅ No validation errors for selecting < 2 hours
- ✅ Clear visual indication when minimum is enforced
- ✅ Backend double-checks and enforces minimum
- ✅ Stripe receives correct deposit amount ($75 for 2 hours)
- ✅ Professional, transparent user experience
