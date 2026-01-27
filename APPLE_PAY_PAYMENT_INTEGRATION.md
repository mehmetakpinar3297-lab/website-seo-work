# Apple Pay & Payment Methods Integration Guide

## Overview
The booking system now clearly displays support for multiple payment methods through Stripe Checkout, including Apple Pay, Google Pay, and traditional credit/debit cards.

## Payment Structure

### Deposit (50% Upfront)
- **Amount**: 50% of total booking price
- **Purpose**: Required to confirm booking
- **When Charged**: Immediately upon booking confirmation
- **Example**: For a $150 booking (2 hours × $75/hr), deposit is $75

### Remaining Balance (50% After Service)
- **Amount**: 50% of total booking price
- **Purpose**: Final payment for completed service
- **When Charged**: After the ride/service is completed
- **Example**: For a $150 booking, remaining balance is $75

## Supported Payment Methods

### 1. Credit/Debit Cards
- **Supported Cards**: Visa, Mastercard, American Express, Discover
- **Availability**: All devices and browsers
- **Processing**: Stripe Checkout

### 2. Apple Pay
- **Availability**: Automatically appears on:
  - iPhone (Safari, Chrome, any browser)
  - iPad (Safari, Chrome, any browser)
  - Mac (Safari browser)
  - Apple Watch (when linked)
- **Requirements**: 
  - iOS 10+ or macOS 10.12+
  - Card saved in Apple Wallet
- **Display**: Black button with Apple logo
- **Processing**: Stripe Checkout with Apple Pay API

### 3. Google Pay
- **Availability**: Automatically appears on:
  - Android devices (Chrome, any browser)
  - Chrome browser on desktop
  - Any device with Google Pay enabled
- **Requirements**:
  - Chrome browser or Android device
  - Card saved in Google Pay
- **Display**: Button with Google Pay logo
- **Processing**: Stripe Checkout with Google Pay API

## Implementation Details

### Frontend (Booking Page)

#### Payment Methods Display
```jsx
<div className="payment-methods">
  <p>We Accept</p>
  <div className="payment-icons">
    - Credit/Debit Card icon
    - Apple Pay icon (black background)
    - Google Pay icon (colored)
  </div>
  <p>Secure payment powered by Stripe</p>
</div>
```

#### Booking Summary Breakdown
```
Total Price: $150.00
Billing Duration: 2.00 hrs
Rate: $75/hour

50% Deposit: $75.00 (Due now to confirm booking)
Remaining Balance: $75.00 (Due after service)
```

### Backend Integration

#### Stripe Checkout Session
```python
CheckoutSessionRequest(
    amount=deposit_amount,  # 50% of total
    currency="usd",
    success_url=success_url,
    cancel_url=cancel_url,
    metadata={
        "booking_id": checkout_req.booking_id,
        "customer_email": booking['email'],
        "customer_name": booking['full_name'],
        "total_price": str(booking['total_price']),
        "deposit_amount": str(deposit_amount),
        "remaining_balance": str(remaining_balance),
        "service_type": "hourly_chauffeur",
        "payment_type": "50_percent_deposit"
    }
)
```

## How Apple Pay Works

### User Experience Flow

1. **Booking Form**
   - User fills out date, time, locations, contact info
   - System calculates total price based on duration
   - Booking summary shows deposit amount

2. **Payment Page** (Stripe Checkout)
   - On iPhone/iPad/Mac Safari: Apple Pay button appears automatically
   - User taps "Pay with Apple Pay"
   - Face ID / Touch ID authentication
   - Payment processed instantly

3. **Confirmation**
   - Redirect to success page
   - Booking confirmed with 50% deposit paid
   - Remaining 50% due after service

### Technical Implementation

Stripe Checkout automatically enables Apple Pay when:
- ✅ Website uses HTTPS
- ✅ User is on a supported device (iOS/macOS)
- ✅ User has Apple Pay set up
- ✅ Stripe account has Apple Pay enabled (default)

**No additional code required** - Stripe handles everything!

## Google Pay Integration

### Automatic Availability
Google Pay appears automatically when:
- ✅ User is on Chrome browser (desktop or Android)
- ✅ User is on Android device with Google Pay
- ✅ User has cards saved in Google Pay
- ✅ Stripe Checkout is used (enabled by default)

### User Flow
1. User clicks "Proceed to Payment"
2. Stripe Checkout page loads
3. Google Pay button appears (if eligible)
4. One-click payment with biometric or PIN
5. Instant confirmation

## Minimum 2-Hour Booking Enforcement

### Calculation Examples

#### Example 1: 1 Hour Selected
```
Selected Duration: 1.00 hrs
⚠️ Minimum 2 hours enforced
Billing Duration: 2.00 hrs
Total Price: $150.00
Deposit (50%): $75.00
Remaining Balance: $75.00
```

#### Example 2: 3 Hours Selected
```
Selected Duration: 3.00 hrs
Billing Duration: 3.00 hrs
Total Price: $225.00
Deposit (50%): $112.50
Remaining Balance: $112.50
```

#### Example 3: 1.5 Hours Selected
```
Selected Duration: 1.50 hrs
⚠️ Minimum 2 hours enforced
Billing Duration: 2.00 hrs
Total Price: $150.00
Deposit (50%): $75.00
Remaining Balance: $75.00
```

## Admin Dashboard / Database

### Booking Record Structure
```json
{
  "id": "booking_123",
  "total_price": 150.00,
  "deposit_amount": 75.00,
  "remaining_balance": 75.00,
  "payment_status": "deposit_paid",
  "payment_metadata": {
    "deposit_paid": true,
    "deposit_paid_at": "2025-01-27T10:30:00Z",
    "payment_method": "apple_pay",
    "remaining_due": 75.00
  }
}
```

### Payment Status Values
- `pending` - No payment made yet
- `deposit_paid` - 50% deposit paid, booking confirmed
- `fully_paid` - Both deposit and remaining balance paid
- `refunded` - Payment refunded

## Testing

### Test Cards (Stripe Test Mode)
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Apple Pay Testing
- Use Safari on iPhone/iPad/Mac
- Ensure test mode in Stripe
- Use test cards saved in Apple Wallet

### Google Pay Testing
- Use Chrome browser
- Enable Google Pay test mode
- Use test cards in Google Pay

## Security Features

### Stripe Checkout Security
- ✅ PCI DSS Level 1 compliant
- ✅ 3D Secure authentication
- ✅ Fraud detection with Stripe Radar
- ✅ SSL/TLS encryption
- ✅ Tokenized payments (no card data stored)

### Apple Pay Security
- ✅ Biometric authentication (Face ID/Touch ID)
- ✅ Device-specific tokens (not actual card numbers)
- ✅ Transaction-specific security codes
- ✅ No card data shared with merchant

### Google Pay Security
- ✅ Virtual card numbers
- ✅ Biometric/PIN authentication
- ✅ Encrypted transaction data
- ✅ Fraud protection

## User Benefits

### For Customers
1. **Multiple Payment Options**: Choose their preferred method
2. **Fast Checkout**: Apple Pay and Google Pay are 1-click
3. **Secure**: Industry-leading security standards
4. **Clear Pricing**: See exactly what they pay now vs. later
5. **Mobile-Friendly**: Optimized for phone payments

### For Business
1. **Higher Conversion**: More payment options = more bookings
2. **Faster Payments**: Digital wallets process instantly
3. **Lower Abandonment**: Simplified checkout reduces drop-off
4. **Professional**: Modern payment experience
5. **Tracking**: Full payment metadata in Stripe dashboard

## Troubleshooting

### Apple Pay Not Showing
- Check device compatibility (iOS 10+, macOS 10.12+)
- Verify Apple Pay is set up in Wallet
- Ensure using Safari browser
- Confirm website is HTTPS

### Google Pay Not Showing
- Check browser (Chrome required)
- Verify Google Pay account is set up
- Ensure cards are saved in Google Pay
- Clear browser cache if issues persist

### Payment Failures
- Verify card has sufficient funds
- Check if card is expired
- Ensure billing address matches
- Contact Stripe support for declined payments

## Next Steps

### Future Enhancements
1. **Remaining Balance Collection**
   - Automated invoice after service
   - Link for remaining 50% payment
   - Email reminder system

2. **Payment Methods**
   - PayPal integration (optional)
   - Afterpay/Klarna for installments
   - ACH/Bank transfer option

3. **Admin Dashboard**
   - Payment status overview
   - Pending balance tracking
   - Automated reminder system
   - Payment history reports

## Support

### Customer Support
- **Phone**: (929) 867-8846
- **Email**: info@atlantahourlyride.com
- **Hours**: 24/7

### Technical Support
- **Stripe Dashboard**: dashboard.stripe.com
- **Stripe Support**: support.stripe.com
- **Documentation**: stripe.com/docs/checkout
