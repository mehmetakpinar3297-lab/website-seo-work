# Contact Information & Live Chat Implementation

## Updated Contact Information

### New Contact Details
- **Phone**: (929) 867-8846
- **Email**: info@atlantahourlyride.com

### Locations Updated
1. **Navigation Header** (Desktop only)
   - Top bar with phone and email links
   - Clickable with icons

2. **Footer** (All pages)
   - Phone: `tel:+19298678846` link (opens dialer on mobile)
   - Email: `mailto:info@atlantahourlyride.com` link (opens mail client)

3. **Contact Page**
   - Updated phone and email in contact information cards
   - Both clickable with proper `tel:` and `mailto:` links

## Live Chat Widget Implementation

### Features
- **Position**: Fixed bottom-right corner of screen
- **Visibility**: Available on all pages
- **Z-index**: 50 (floats above all content)

### Chat Functionality

#### Initial Greeting
"Hi! Need help booking your luxury ride? Chat with us now!"

#### Quick Actions (First Interaction)
1. **Book a ride** - Navigates to booking page
2. **Call us** - Opens phone dialer with (929) 867-8846
3. **View services** - Navigates to services page

#### Smart Auto-Responses
The bot provides intelligent responses based on keywords:

- **"book", "reserve", "reservation"** → Booking information and pricing
- **"price", "cost", "rate"** → $75/hour, 2-hour minimum, 50% deposit
- **"hours", "time", "available"** → 24/7 availability information
- **"service"** → Lists all services (Hourly, Airport, Events, Business, Personal)
- **"payment", "pay"** → Payment methods and deposit information
- **"vehicle", "car"** → 2025 Toyota Sienna details
- **"contact", "phone", "email"** → Contact information
- **"cancel"** → Cancellation policy (24-hour notice)
- **"hello", "hi"** → Greeting response
- **Default** → General assistance message with phone number

### UI/UX Design
- **Chat Button**: Black circle with MessageCircle icon and pulse indicator
- **Chat Window**: 
  - Width: 384px (responsive on mobile)
  - Height: 600px
  - Beige background for messages area
  - Black header with "Live Chat" and online indicator
  - White input area with send button
  
### Technical Implementation
- Component: `/app/frontend/src/components/ChatWidget.js`
- Auto-scroll to latest messages
- Timestamp on each message
- Responsive design (adapts to mobile)
- Accessible with ARIA labels

## Testing Checklist
- [ ] Phone links open dialer on mobile
- [ ] Email links open mail client
- [ ] Chat widget appears on all pages
- [ ] Chat button is clickable and opens chat window
- [ ] Quick actions work (Book, Call, View services)
- [ ] Bot responds to common queries
- [ ] Messages scroll properly
- [ ] Close button works
- [ ] Mobile responsive

## Files Modified
1. `/app/frontend/src/components/Navigation.js` - Added top contact bar
2. `/app/frontend/src/components/Footer.js` - Updated contact info
3. `/app/frontend/src/pages/Contact.js` - Updated contact info
4. `/app/frontend/src/components/ChatWidget.js` - New component
5. `/app/frontend/src/App.js` - Added ChatWidget to all pages
