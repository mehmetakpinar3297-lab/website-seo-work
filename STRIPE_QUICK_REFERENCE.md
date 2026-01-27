# Stripe Live Mode - Quick Reference Card

## ✅ CONFIGURATION COMPLETE

**Project**: ATL Hourly Ride  
**Mode**: LIVE (Real Payments Active)  
**Date**: January 27, 2025

---

## 🔑 API Keys

### Secret Key (Backend)
```
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
```

### Publishable Key (Frontend)
```
pk_live_51SuGKuRphnplNJB8Jk1yheBet9EyMumhsinQx5QKFhFukStPl7Ik2aohha6WYNxPes20UeXH80lFmoTR8hFGf3pt00pJp7hF9A
```

---

## 💰 Payment Structure

| Item | Amount | When Due |
|------|--------|----------|
| **2-Hour Booking** | $150 total | |
| Deposit (50%) | $75 | At booking |
| Remaining Balance | $75 | After service |

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **Stripe Dashboard** | https://dashboard.stripe.com |
| **Payments** | https://dashboard.stripe.com/payments |
| **Webhooks** | https://dashboard.stripe.com/webhooks |
| **Payouts** | https://dashboard.stripe.com/settings/payouts |
| **Customers** | https://dashboard.stripe.com/customers |

---

## 📱 Payment Methods

✅ **Credit/Debit Cards** - All devices  
✅ **Apple Pay** - iPhone, iPad, Mac (Safari)  
✅ **Google Pay** - Android, Chrome browser  

---

## ⚡ Quick Actions

### View Today's Payments
```
https://dashboard.stripe.com/payments?date=today
```

### Process a Refund
```
Dashboard → Payments → Select Payment → Refund
```

### Check Payout Schedule
```
Dashboard → Settings → Payouts
```

---

## 🚨 Emergency Contact

**Stripe Support**: 1-888-926-2289  
**Your Support**: (929) 867-8846  
**Email**: info@atlantahourlyride.com

---

## ⚠️ IMPORTANT REMINDERS

1. **Live Mode is Active** - Real cards will be charged
2. **Stripe Fees**: 2.9% + $0.30 per transaction
3. **Payouts**: 2 business days to bank account
4. **Refunds**: Process within 24 hours for best practice
5. **Disputes**: Respond within 7 days

---

## 📊 Revenue Calculator

**Example: 20 bookings/month (2 hours each)**

```
20 × $150 = $3,000 total revenue
50% deposits = $1,500 collected upfront
Stripe fees ≈ $60
Net deposits = $1,440
```

---

## ✅ Status

- [x] Backend configured with live secret key
- [x] Frontend configured with live publishable key
- [x] Services restarted and operational
- [x] Apple Pay enabled (automatic)
- [x] Google Pay enabled (automatic)
- [x] Payment metadata configured
- [x] Webhook endpoint ready

---

**Ready to accept real payments!** 🎉
