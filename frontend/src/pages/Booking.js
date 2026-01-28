import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, DollarSign, CreditCard } from 'lucide-react';
import MapboxAutocomplete from '../components/MapboxAutocomplete';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HOURLY_RATE = 75;
const MIN_HOURS = 2;

// Generate time slots in 15-minute intervals
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const time = `${String(displayHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [calculation, setCalculation] = useState({
    durationHours: 0,
    billingDuration: 0,
    totalPrice: 0,
    depositAmount: 0
  });

  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  // Check payment status if returning from Stripe
  useEffect(() => {
    if (sessionId) {
      checkPaymentStatus(sessionId);
    }
  }, [sessionId]);

  const checkPaymentStatus = async (sessionId, attempts = 0) => {
    const maxAttempts = 5;
    if (attempts >= maxAttempts) {
      toast.error('Payment verification timed out. Please contact support.');
      return;
    }

    try {
      const response = await axios.get(`${API}/payments/status/${sessionId}`);
      
      if (response.data.payment_status === 'paid') {
        toast.success('Payment successful! Your booking is confirmed.');
        setTimeout(() => navigate('/'), 3000);
        return;
      } else if (response.data.status === 'expired') {
        toast.error('Payment session expired. Please try again.');
        return;
      }

      // Continue polling
      setTimeout(() => checkPaymentStatus(sessionId, attempts + 1), 2000);
    } catch (error) {
      console.error('Error checking payment status:', error);
      toast.error('Error verifying payment. Please contact support.');
    }
  };

  const calculateDuration = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;

    const timeToMinutes = (time) => {
      const [timePart, period] = time.split(' ');
      let [hours, minutes] = timePart.split(':').map(Number);
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return hours * 60 + minutes;
    };

    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    
    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60; // Next day
    
    return diffMinutes / 60;
  };

  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const duration = calculateDuration(formData.startTime, formData.endTime);
      // Enforce minimum 2 hours for billing
      const billingDuration = Math.max(MIN_HOURS, duration);
      const total = billingDuration * HOURLY_RATE;
      const deposit = total * 0.5;

      setCalculation({
        durationHours: duration,
        billingDuration: billingDuration,
        totalPrice: total,
        depositAmount: deposit
      });
    }
  }, [formData.startTime, formData.endTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Check availability
      const availabilityResponse = await axios.get(`${API}/bookings/check-availability`, {
        params: {
          date: formData.date,
          start_time: formData.startTime,
          end_time: formData.endTime
        }
      });

      if (!availabilityResponse.data.available) {
        toast.error(availabilityResponse.data.message);
        setLoading(false);
        return;
      }

      // Create booking with billing duration (minimum 2 hours enforced)
      const bookingData = {
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        pickup_location: formData.pickupLocation,
        dropoff_location: formData.dropoffLocation,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        duration_hours: calculation.billingDuration, // Use billing duration (min 2 hours)
        total_price: calculation.totalPrice,
        deposit_amount: calculation.depositAmount,
        special_requests: formData.specialRequests || null
      };

      const bookingResponse = await axios.post(`${API}/bookings`, bookingData);
      const createdBookingId = bookingResponse.data.id;
      setBookingId(createdBookingId);

      // Create Stripe checkout session
      const checkoutResponse = await axios.post(`${API}/payments/checkout`, {
        booking_id: createdBookingId,
        origin_url: window.location.origin
      });

      // Redirect to Stripe
      window.location.href = checkoutResponse.data.url;
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.detail || 'Failed to create booking');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-playfair text-5xl md:text-6xl text-[#1B1B1B] tracking-tight mb-4">
              Book Your Ride
            </h1>
            <p className="text-lg text-[#2C2C2C] font-manrope">
              Reserve your luxury chauffeur service by the hour. 2-hour minimum, $75 per hour.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 border border-[#1B1B1B]/5">
                <form onSubmit={handleSubmit} data-testid="booking-form">
                  {/* Date */}
                  <div className="mb-8">
                    <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                      <Calendar className="w-4 h-4 mr-2 text-[#B89D62]" />
                      Date
                    </label>
                    <input
                      type="date"
                      data-testid="date-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors font-manrope text-[#1B1B1B]"
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                        <Clock className="w-4 h-4 mr-2 text-[#B89D62]" />
                        Start Time
                      </label>
                      <select
                        data-testid="start-time-select"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors font-manrope text-[#1B1B1B]"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                        <Clock className="w-4 h-4 mr-2 text-[#B89D62]" />
                        End Time
                      </label>
                      <select
                        data-testid="end-time-select"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors font-manrope text-[#1B1B1B]"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Locations */}
                  <div className="mb-8">
                    <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                      <MapPin className="w-4 h-4 mr-2 text-[#B89D62]" />
                      Pickup Location
                    </label>
                    <MapboxAutocomplete
                      id="pickup-location"
                      value={formData.pickupLocation}
                      onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
                      placeholder="Enter pickup address in Atlanta"
                      testId="pickup-location-input"
                      required={true}
                    />
                  </div>

                  <div className="mb-8">
                    <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                      <MapPin className="w-4 h-4 mr-2 text-[#B89D62]" />
                      Drop-off Location
                    </label>
                    <MapboxAutocomplete
                      id="dropoff-location"
                      value={formData.dropoffLocation}
                      onChange={(value) => setFormData({ ...formData, dropoffLocation: value })}
                      placeholder="Enter drop-off address in Atlanta"
                      testId="dropoff-location-input"
                      required={true}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-[#1B1B1B]/10 pt-8 mb-8">
                    <h3 className="text-sm uppercase tracking-widest text-[#1B1B1B] mb-6 font-manrope">
                      Contact Information
                    </h3>

                    <div className="mb-6">
                      <input
                        type="text"
                        data-testid="fullname-input"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Full Name"
                        required
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        type="email"
                        data-testid="email-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email Address"
                        required
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        data-testid="phone-input"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone Number"
                        required
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                      />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="border-t border-[#1B1B1B]/10 pt-8 mb-8">
                    <h3 className="text-sm uppercase tracking-widest text-[#1B1B1B] mb-6 font-manrope">
                      Special Requests (Optional)
                    </h3>

                    <div>
                      <textarea
                        data-testid="special-requests-input"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="e.g., Birthday celebration, Valentine's day, extra drinks"
                        rows="4"
                        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B] resize-none"
                      ></textarea>
                      <p className="text-xs text-[#2C2C2C] mt-2 font-manrope">
                        Let us know if you have any special requests or needs for your ride.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    data-testid="proceed-to-payment-btn"
                    disabled={loading || !formData.date || !formData.startTime || !formData.endTime}
                    className="w-full bg-[#1B1B1B] text-white px-10 py-5 uppercase tracking-widest text-sm font-manrope font-medium hover:bg-[#2C2C2C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </form>
              </div>
            </div>

            {/* Price Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl p-8" data-testid="price-summary">
                <h3 className="text-sm uppercase tracking-widest text-[#1B1B1B] mb-8 font-manrope">
                  Booking Summary
                </h3>

                <div className="space-y-6 mb-8">
                  <div className="flex justify-between items-center pb-4 border-b border-[#1B1B1B]/10">
                    <span className="text-[#2C2C2C] font-manrope">Selected Duration</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium" data-testid="duration-display">
                      {calculation.durationHours.toFixed(2)} hrs
                    </span>
                  </div>

                  {calculation.durationHours > 0 && calculation.durationHours < MIN_HOURS && (
                    <div className="bg-[#B89D62]/10 border-l-2 border-[#B89D62] p-4 -mt-2">
                      <p className="text-sm text-[#1B1B1B] font-manrope font-medium">
                        Minimum 2 hours enforced
                      </p>
                      <p className="text-xs text-[#2C2C2C] mt-1 font-manrope">
                        Billing: {calculation.billingDuration} hours
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pb-4 border-b border-[#1B1B1B]/10">
                    <span className="text-[#2C2C2C] font-manrope">Rate</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium">
                      ${HOURLY_RATE}/hour
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#1B1B1B]/10">
                    <span className="text-[#2C2C2C] font-manrope">Billing Duration</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium">
                      {calculation.billingDuration.toFixed(2)} hrs
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#1B1B1B]/10">
                    <span className="text-[#1B1B1B] font-manrope font-medium">Total</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium text-xl" data-testid="total-price-display">
                      ${calculation.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-[#B89D62]/10 p-6 border-l-2 border-[#B89D62]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm uppercase tracking-widest text-[#1B1B1B] font-manrope">
                        50% Deposit
                      </span>
                      <CreditCard className="w-5 h-5 text-[#B89D62]" />
                    </div>
                    <div className="text-3xl font-playfair text-[#1B1B1B] mb-2" data-testid="deposit-amount-display">
                      ${calculation.depositAmount.toFixed(2)}
                    </div>
                    <p className="text-xs text-[#2C2C2C] font-manrope mb-3">
                      Due now to confirm booking
                    </p>
                    <div className="border-t border-[#1B1B1B]/10 pt-3 mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#2C2C2C] font-manrope">Remaining Balance:</span>
                        <span className="text-[#1B1B1B] font-manrope font-medium">
                          ${calculation.depositAmount.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-[#2C2C2C] mt-1 font-manrope">
                        Due after service
                      </p>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 p-4 bg-white border border-[#1B1B1B]/10 rounded">
                    <p className="text-xs uppercase tracking-widest text-[#1B1B1B] mb-3 font-manrope">
                      We Accept
                    </p>
                    <div className="flex items-center space-x-3 flex-wrap">
                      <div className="flex items-center space-x-2 px-3 py-2 bg-[#F5F5F0] rounded text-xs font-manrope">
                        <CreditCard className="w-4 h-4 text-[#1B1B1B]" />
                        <span>Card</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 bg-black rounded text-xs font-manrope text-white">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.72-2.84 0-2.27-1.85-3.09-3.65-3.35z"/>
                        </svg>
                        <span>Apple Pay</span>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-2 bg-[#F5F5F0] rounded text-xs font-manrope">
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Google Pay</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#2C2C2C] mt-3 font-manrope">
                      Secure payment powered by Stripe. Apple Pay and Google Pay available on supported devices.
                    </p>
                  </div>
                </div>

                {formData.specialRequests && (
                  <div className="mb-8 pb-8 border-b border-[#1B1B1B]/10">
                    <h4 className="text-xs uppercase tracking-widest text-[#1B1B1B] mb-3 font-manrope">
                      Special Requests
                    </h4>
                    <p className="text-sm text-[#2C2C2C] font-manrope italic">
                      "{formData.specialRequests}"
                    </p>
                  </div>
                )}

                <div className="text-xs text-[#2C2C2C] space-y-2 font-manrope">
                  <p>• Minimum booking is 2 hours</p>
                  <p>• Cancellation: 24 hours notice required</p>
                  <p>• Gratuity not included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
