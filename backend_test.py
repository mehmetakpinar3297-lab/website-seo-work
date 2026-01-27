import requests
import sys
import json
from datetime import datetime, timedelta

class AtlantaChauffeurAPITester:
    def __init__(self, base_url="https://hourly-limo.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "status": "PASSED" if success else "FAILED",
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            
            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if not success:
                details += f", Expected: {expected_status}"
                try:
                    error_data = response.json()
                    details += f", Response: {error_data}"
                except:
                    details += f", Response: {response.text[:200]}"
            
            self.log_test(name, success, details)
            return success, response.json() if success and response.content else {}

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_create_booking_valid(self):
        """Test creating a valid booking"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        booking_data = {
            "date": tomorrow,
            "start_time": "09:00 AM",
            "end_time": "11:00 AM",
            "pickup_location": "Hartsfield-Jackson Atlanta International Airport",
            "dropoff_location": "Downtown Atlanta",
            "full_name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-404-555-0123",
            "duration_hours": 2.0,
            "total_price": 200.0,
            "deposit_amount": 100.0
        }
        return self.run_test("Create Valid Booking", "POST", "bookings", 200, booking_data)

    def test_create_booking_invalid_duration(self):
        """Test creating booking with less than 2 hours (should fail)"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        booking_data = {
            "date": tomorrow,
            "start_time": "09:00 AM",
            "end_time": "10:00 AM",
            "pickup_location": "Hartsfield-Jackson Atlanta International Airport",
            "dropoff_location": "Downtown Atlanta",
            "full_name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "+1-404-555-0123",
            "duration_hours": 1.0,
            "total_price": 100.0,
            "deposit_amount": 50.0
        }
        return self.run_test("Create Invalid Booking (< 2hrs)", "POST", "bookings", 400, booking_data)

    def test_get_bookings(self):
        """Test getting all bookings"""
        return self.run_test("Get All Bookings", "GET", "bookings", 200)

    def test_check_availability_valid(self):
        """Test availability check for valid time slot"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        params = {
            "date": tomorrow,
            "start_time": "02:00 PM",
            "end_time": "04:00 PM"
        }
        return self.run_test("Check Availability - Valid Slot", "GET", "bookings/check-availability", 200, params=params)

    def test_check_availability_conflict(self):
        """Test availability check for conflicting time slot"""
        # First create a booking
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        booking_data = {
            "date": tomorrow,
            "start_time": "05:00 AM",
            "end_time": "07:00 AM",
            "pickup_location": "Airport",
            "dropoff_location": "Downtown",
            "full_name": "Test User",
            "email": "test@example.com",
            "phone": "+1-404-555-0123",
            "duration_hours": 2.0,
            "total_price": 200.0,
            "deposit_amount": 100.0
        }
        
        # Create the booking first
        success, _ = self.run_test("Create Booking for Conflict Test", "POST", "bookings", 200, booking_data)
        
        if success:
            # Now check availability for overlapping time (should conflict due to 1.5hr buffer)
            params = {
                "date": tomorrow,
                "start_time": "08:00 AM",  # This should conflict with 5-7 AM + 1.5hr buffer (until 8:30 AM)
                "end_time": "10:00 AM"
            }
            success, response = self.run_test("Check Availability - Conflict", "GET", "bookings/check-availability", 200, params=params)
            
            # Check if the response indicates unavailability
            if success and response.get('available') == False:
                self.log_test("Availability Conflict Detection", True, "Correctly detected conflict")
                return True, response
            else:
                self.log_test("Availability Conflict Detection", False, f"Expected unavailable, got: {response}")
                return False, response
        
        return False, {}

    def test_contact_form(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "+1-404-555-0456",
            "message": "I would like to inquire about your hourly chauffeur service for a business meeting."
        }
        return self.run_test("Contact Form Submission", "POST", "contact", 200, contact_data)

    def test_stripe_checkout_creation(self):
        """Test Stripe checkout session creation"""
        # First create a booking
        tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        booking_data = {
            "date": tomorrow,
            "start_time": "03:00 PM",
            "end_time": "05:00 PM",
            "pickup_location": "Hotel",
            "dropoff_location": "Conference Center",
            "full_name": "Business User",
            "email": "business@example.com",
            "phone": "+1-404-555-0789",
            "duration_hours": 2.0,
            "total_price": 200.0,
            "deposit_amount": 100.0
        }
        
        success, booking_response = self.run_test("Create Booking for Stripe Test", "POST", "bookings", 200, booking_data)
        
        if success and 'id' in booking_response:
            checkout_data = {
                "booking_id": booking_response['id'],
                "origin_url": "https://hourly-limo.preview.emergentagent.com"
            }
            return self.run_test("Create Stripe Checkout", "POST", "payments/checkout", 200, checkout_data)
        
        return False, {}

    def test_payment_status_invalid_session(self):
        """Test payment status with invalid session ID"""
        return self.run_test("Payment Status - Invalid Session", "GET", "payments/status/invalid_session_id", 520)

    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting Atlanta Luxury Chauffeur API Tests...")
        print(f"Testing against: {self.api_url}")
        print("=" * 60)
        
        # Basic API tests
        self.test_api_root()
        
        # Booking tests
        self.test_create_booking_valid()
        self.test_create_booking_invalid_duration()
        self.test_get_bookings()
        
        # Availability tests
        self.test_check_availability_valid()
        self.test_check_availability_conflict()
        
        # Contact form test
        self.test_contact_form()
        
        # Payment tests
        self.test_stripe_checkout_creation()
        self.test_payment_status_invalid_session()
        
        # Print summary
        print("=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    tester = AtlantaChauffeurAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())