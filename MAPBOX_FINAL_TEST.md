# Mapbox Autocomplete - Final Test Instructions

## What I Fixed

### 1. Added Detailed Console Logging
Every step now logs to console so you can see exactly what's happening:
- `[pickup-location] Starting Mapbox initialization...`
- `[pickup-location] Loading Mapbox GL...`
- `[pickup-location] Mapbox GL loaded`
- `[pickup-location] Loading Mapbox Geocoder...`
- `[pickup-location] Mapbox Geocoder loaded`
- `[pickup-location] Creating geocoder instance...`
- `[pickup-location] Geocoder added to DOM`
- `[pickup-location] ✅ Autocomplete ready! Type to see suggestions.`

### 2. Fixed CSS to FORCE Dropdown Visibility
Added critical CSS rules:
```css
.suggestions-wrapper, .suggestions {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 9999 !important;
  background-color: white !important;
}
```

### 3. Added Event Logging
Now logs when suggestions appear:
- `[pickup-location] Got 5 suggestions`

## How to Test Right Now

### Step 1: Open Browser Console
- Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac)
- Go to Console tab

### Step 2: Go to Booking Page
Navigate to `/booking`

### Step 3: Watch Console Logs
You should see:
```
[pickup-location] Starting Mapbox initialization...
[pickup-location] Mapbox GL loaded
[pickup-location] Mapbox Geocoder loaded
[pickup-location] Geocoder added to DOM
[pickup-location] ✅ Autocomplete ready! Type to see suggestions.

[dropoff-location] Starting Mapbox initialization...
[dropoff-location] ✅ Autocomplete ready! Type to see suggestions.
```

### Step 4: Test Typing
1. Click in "Pickup Location" field
2. Type: `atl`
3. **Watch console** - should log: `[pickup-location] Got X suggestions`
4. **Look below the input** - white dropdown should appear

## What the Dropdown Should Look Like

```
┌─────────────────────────────────────────┐
│ Pickup Location                         │
├─────────────────────────────────────────┤
│ atl█                                    │ ← Input (you're typing)
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐ ← White dropdown appears!
│ ✈️ Hartsfield-Jackson Atlanta Int'l    │
│    6000 N Terminal Pkwy, Atlanta, GA   │
├─────────────────────────────────────────┤
│ 📍 Atlanta, Georgia, United States      │
├─────────────────────────────────────────┤
│ 📍 Atlantic Station, Atlanta, GA        │
├─────────────────────────────────────────┤
│ 🏨 Atlanta Marriott Marquis             │
└─────────────────────────────────────────┘
```

## If Dropdown Still Doesn't Appear

### Check Console Logs

**If you see "Using fallback input":**
- Mapbox failed to load
- Check internet connection
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

**If you see "Got X suggestions" but no dropdown:**
- Dropdown exists but CSS might be hiding it
- Inspect element (right-click input → Inspect)
- Look for element with class `suggestions`
- Check if it has `display: none` or `visibility: hidden`

### Manual CSS Override
If dropdown still hidden, paste this in browser console:
```javascript
const style = document.createElement('style');
style.innerHTML = `
  .mapboxgl-ctrl-geocoder .suggestions,
  .mapboxgl-ctrl-geocoder .suggestions-wrapper {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: white !important;
    border: 1px solid #ccc !important;
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 99999 !important;
  }
`;
document.head.appendChild(style);
```

Then type in the input again.

## Test Addresses

Try these to verify autocomplete:

1. **"atlanta air"** → Should show airport
2. **"peachtree"** → Should show Peachtree Street
3. **"buck"** → Should show Buckhead
4. **"fox"** → Should show Fox Theatre
5. **"123"** → Should show addresses starting with 123

## Success Checklist

- [ ] Console shows "✅ Autocomplete ready!"
- [ ] Typing shows "Got X suggestions" in console
- [ ] White dropdown appears below input
- [ ] Dropdown has addresses with icons
- [ ] Clicking suggestion fills the input
- [ ] Dropdown disappears after selection

## Still Not Working?

Share with me:
1. Screenshot of browser console
2. Screenshot of the input field area
3. Output of this command in console:
   ```javascript
   console.log({
     mapboxgl: typeof window.mapboxgl,
     geocoder: typeof window.MapboxGeocoder,
     suggestions: document.querySelectorAll('.suggestions').length
   });
   ```

This will help me understand what's blocking the dropdown!
