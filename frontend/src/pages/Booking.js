import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Calendar, Clock, MapPin, DollarSign, CreditCard } from 'lucide-react';

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
    phone: ''
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
        deposit_amount: calculation.depositAmount
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
                    <input
                      type="text"
                      data-testid="pickup-location-input"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="Enter pickup address in Atlanta"
                      required
                      className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="flex items-center text-sm uppercase tracking-widest text-[#1B1B1B] mb-4 font-manrope">
                      <MapPin className="w-4 h-4 mr-2 text-[#B89D62]" />
                      Drop-off Location
                    </label>
                    <input
                      type="text"
                      data-testid="dropoff-location-input"
                      value={formData.dropoffLocation}
                      onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                      placeholder="Enter drop-off address in Atlanta"
                      required
                      className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
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

                  <button
                    type="submit"
                    data-testid="proceed-to-payment-btn"
                    disabled={loading || calculation.durationHours < MIN_HOURS}
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
                    <span className="text-[#2C2C2C] font-manrope">Duration</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium" data-testid="duration-display">
                      {calculation.durationHours.toFixed(2)} hrs
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#1B1B1B]/10">
                    <span className="text-[#2C2C2C] font-manrope">Rate</span>
                    <span className="text-[#1B1B1B] font-manrope font-medium">
                      ${HOURLY_RATE}/hour
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
                    <div className="text-3xl font-playfair text-[#1B1B1B]" data-testid="deposit-amount-display">
                      ${calculation.depositAmount.toFixed(2)}
                    </div>
                    <p className="text-xs text-[#2C2C2C] mt-3 font-manrope">
                      Due now. Remaining balance due after service.
                    </p>
                  </div>
                </div>

                {calculation.durationHours < MIN_HOURS && calculation.durationHours > 0 && (
                  <div className="bg-red-50 border-l-2 border-red-500 p-4 mb-6">
                    <p className="text-sm text-red-800 font-manrope">
                      Minimum booking is {MIN_HOURS} hours
                    </p>
                  </div>
                )}

                <div className="text-xs text-[#2C2C2C] space-y-2 font-manrope">
                  <p>• 2-hour minimum booking</p>
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
