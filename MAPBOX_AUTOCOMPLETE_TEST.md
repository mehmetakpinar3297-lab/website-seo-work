# Mapbox Autocomplete - Quick Test Guide

## How to Test Autocomplete

### Step 1: Open Booking Page
Go to: `/booking`

### Step 2: Click on Pickup Location Field
- Click inside the "Pickup Location" input
- You should see a cursor and be able to type

### Step 3: Start Typing
Type: **"atlanta air"**

### Step 4: Wait for Suggestions
After typing 2+ characters, you should see a dropdown appear with suggestions like:
```
✈️ Hartsfield-Jackson Atlanta International Airport
   6000 N Terminal Pkwy, Atlanta, GA 30320

✈️ Atlanta Airport Marriott Gateway
   2020 Convention Center Concourse, Atlanta, GA 30337
```

### Step 5: Select an Address
- Click on one of the suggestions
- The input should populate with the full address
- The dropdown should disappear

## What Changed

### 1. Simplified Implementation
- Removed complex timeout logic
- Cleaner initialization code
- Better error handling

### 2. Added Global CSS Styling
- Dropdown is now properly styled
- Matches luxury theme (beige/black/gold)
- Visible with proper z-index
- Smooth hover effects

### 3. Key CSS Classes Added
```css
.mapboxgl-ctrl-geocoder .suggestions
- White background
- Border and shadow
- Proper z-index (1000)

.mapboxgl-ctrl-geocoder--suggestion
- Padding and spacing
- Hover effect (beige background)
- Proper cursor

.mapboxgl-ctrl-geocoder--input:focus
- Gold bottom border (#B89D62)
```

## Quick Test Addresses

### Test 1: Airport
Type: `atlanta air`
Expected: Hartsfield-Jackson Airport suggestions

### Test 2: Downtown
Type: `peachtree st`
Expected: Peachtree Street addresses

### Test 3: Buckhead
Type: `buckhead`
Expected: Buckhead area locations

### Test 4: Mall
Type: `lenox`
Expected: Lenox Square Mall

### Test 5: Landmark
Type: `fox theatre`
Expected: Fox Theatre address

## Troubleshooting

### If dropdown doesn't appear:

1. **Open Browser Console (F12)**
   - Look for: "Mapbox autocomplete initialized"
   - Check for any red error messages

2. **Check Network Tab**
   - Look for requests to `api.mapbox.com`
   - Verify they return 200 status

3. **Inspect the Input**
   - Right-click input → Inspect
   - Look for class: `mapboxgl-ctrl-geocoder--input`
   - If not present, Mapbox didn't load

4. **Clear Browser Cache**
   - Press Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - This forces fresh load of CSS and JS

### If you see "Failed to load Mapbox":
- Check internet connection
- Try refreshing the page
- Check if Mapbox CDN is accessible

## Expected Behavior

### ✅ Working Correctly
- Can type in input field
- After 2 characters, dropdown appears
- Dropdown shows 5 suggestions max
- Suggestions are Atlanta-focused
- Clicking suggestion fills the input
- Dropdown has white background with shadow
- Hover effect on suggestions (beige)

### ❌ Not Working
- No dropdown appears at all
- Console shows errors
- Can't type in field
- Dropdown appears but is empty

## Browser Console Commands

### Check if Mapbox loaded:
```javascript
console.log('Mapbox GL:', typeof window.mapboxgl);
console.log('Geocoder:', typeof window.MapboxGeocoder);
```

Should output:
```
Mapbox GL: object
Geocoder: function
```

### Check active geocoders:
```javascript
document.querySelectorAll('.mapboxgl-ctrl-geocoder').length
```

Should output: `2` (one for pickup, one for dropoff)

## What You Should See

1. **Input Field**: Beige background, bottom border
2. **Typing**: Cursor visible, characters appear
3. **Dropdown**: White box appears below input after 2 characters
4. **Suggestions**: List of addresses with icons
5. **Hover**: Beige background on hover
6. **Selection**: Address fills input, dropdown closes

## Mobile Testing

### On iPhone/iPad:
- Tap input field
- Keyboard appears
- Type address
- Dropdown appears above keyboard
- Tap suggestion to select

### On Android:
- Same behavior as iPhone
- Dropdown responsive to screen size

## Next Steps

If autocomplete is working:
- ✅ Test with various addresses
- ✅ Test on mobile devices
- ✅ Verify booking form submits correctly

If autocomplete is NOT working:
- 📸 Take screenshot of console
- 📸 Take screenshot of Network tab
- 📝 Note exact error message
- 🔄 Try different browser (Chrome, Firefox, Safari)
