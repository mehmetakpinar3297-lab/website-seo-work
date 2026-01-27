# Mapbox Autocomplete - Testing & Debugging Guide

## How to Test

### 1. Open the Booking Page
Navigate to: `https://hourly-limo.preview.emergentagent.com/booking`

### 2. Open Browser Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K`
- **Safari**: Enable Developer Menu first, then `Cmd+Option+I`

### 3. Check Console Logs

You should see these logs when the page loads:

```
Initializing Mapbox geocoder for pickup-location
pickup-location - Geocoder successfully initialized

Initializing Mapbox geocoder for dropoff-location
dropoff-location - Geocoder successfully initialized
```

### 4. Test Autocomplete

#### Test 1: Type in Pickup Location
1. Click on "Pickup Location" field
2. Start typing: `atlanta air`
3. You should see dropdown suggestions:
   ```
   ✈️ Hartsfield-Jackson Atlanta International Airport
   ✈️ Atlanta Airport Marriott Gateway
   ...
   ```

**Expected console log when you select an address:**
```
pickup-location - Address selected: Hartsfield-Jackson Atlanta International Airport, 6000 N Terminal Pkwy, Atlanta, GA 30320, United States
```

#### Test 2: Type in Drop-off Location
1. Click on "Drop-off Location" field
2. Start typing: `peachtree st`
3. You should see dropdown suggestions:
   ```
   📍 Peachtree Street NE, Atlanta, GA
   📍 Peachtree Center, Atlanta, GA
   ...
   ```

**Expected console log:**
```
dropoff-location - Address selected: Peachtree Street NE, Atlanta, GA, United States
```

### 5. Test Clear
1. Click the × button in the input field
2. **Expected console log:**
   ```
   pickup-location - Input cleared
   ```

## Troubleshooting

### Problem: No dropdown appears when typing

**Check Console for Errors:**

1. **Error: "Failed to load Mapbox GL"**
   - Solution: Check internet connection
   - Verify Mapbox CDN is accessible: https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.js

2. **Error: "Mapbox initialization skipped"**
   - Check the log details:
     ```javascript
     {
       hasContainer: true,
       hasGeocoder: false,
       hasMapboxGL: true,
       hasMapboxGeocoder: false
     }
     ```
   - If `hasMapboxGeocoder: false`, the geocoder library didn't load
   - Try refreshing the page

3. **Warning: "Mapbox initialization skipped"**
   - This means the component tried to initialize but something was missing
   - Check which flag is `false` in the console log

### Problem: Dropdown appears but no results

**Check Console for:**
```
pickup-location - Geocoder error: [error details]
```

**Common Causes:**
1. **Invalid API Token**: Verify token is correct
2. **Rate Limit**: Too many requests (free tier: 100k/month)
3. **Network Error**: Check internet connection

**Solution:**
- Verify API token in console:
  ```javascript
  console.log(window.mapboxgl.accessToken);
  // Should output: pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg
  ```

### Problem: Styling looks broken

**Check:**
1. Open browser DevTools → Network tab
2. Look for CSS files:
   - `mapbox-gl.css` (should return 200)
   - `mapbox-gl-geocoder.css` (should return 200)

**If CSS fails to load:**
- Check browser console for CSP (Content Security Policy) errors
- Verify CDN is accessible

## Manual Testing Commands

### Check if Mapbox is loaded
```javascript
// In browser console:
console.log('Mapbox GL:', typeof window.mapboxgl);
console.log('Geocoder:', typeof window.MapboxGeocoder);

// Should output:
// Mapbox GL: object
// Geocoder: function
```

### Check API Token
```javascript
console.log('Token:', window.mapboxgl?.accessToken);
// Should output the token starting with "pk."
```

### Force Re-initialize (if stuck)
```javascript
// Reload the page
window.location.reload();
```

## Expected Behavior

### 1. Initial Load
- ✅ Two input fields visible: Pickup and Drop-off
- ✅ Both have placeholder text
- ✅ Console shows "Geocoder successfully initialized" × 2

### 2. Typing
- ✅ Start typing after 2 characters
- ✅ Dropdown appears within 300ms
- ✅ Results are Atlanta-focused (Georgia addresses)

### 3. Selection
- ✅ Click a result → input populates with full address
- ✅ Console logs the selected address
- ✅ onChange callback fires with the address value

### 4. Clear
- ✅ Click × button → input clears
- ✅ Console logs "Input cleared"

## Performance Checks

### API Call Monitoring
1. Open DevTools → Network tab
2. Type in an input field
3. Look for requests to: `api.mapbox.com/geocoding/v5/`

**Expected:**
- Debounced requests (not on every keystroke)
- Requests only after 2+ characters
- Response time < 500ms

### Rate Limit Check
Visit: https://account.mapbox.com
- Check current month usage
- Should be well below 100,000 requests

## Common Test Addresses

Use these to verify Atlanta-focused results:

```
1. "atlanta airport" → Hartsfield-Jackson
2. "peachtree street" → Multiple Peachtree locations
3. "buckhead" → Buckhead, Atlanta, GA
4. "midtown atlanta" → Midtown area
5. "lenox square" → Lenox Square Mall
6. "fox theatre atlanta" → Fox Theatre
7. "georgia tech" → Georgia Institute of Technology
8. "centennial park" → Centennial Olympic Park
9. "mercedes benz stadium" → Stadium address
10. "ponce city market" → Popular destination
```

## Debug Mode

### Enable Verbose Logging
Add this to browser console:
```javascript
localStorage.setItem('DEBUG', 'MapboxGeocoder');
```

Then reload the page. You'll see detailed Mapbox logs.

### Disable Verbose Logging
```javascript
localStorage.removeItem('DEBUG');
```

## React Component Check

### Verify Component is Mounted
```javascript
// In browser console:
document.querySelectorAll('.mapbox-autocomplete-container');
// Should return: NodeList(2) [div.mapbox-autocomplete-container, div.mapbox-autocomplete-container]
```

### Check Geocoder Elements
```javascript
document.querySelectorAll('.mapboxgl-ctrl-geocoder');
// Should return: NodeList(2) - one for each input
```

### Check Input Elements
```javascript
document.querySelectorAll('.mapboxgl-ctrl-geocoder--input');
// Should return: NodeList(2) - the actual input fields
```

## Success Criteria

✅ **Complete Success** if you see:
1. Two autocomplete input fields on booking page
2. Dropdown suggestions appear when typing
3. Atlanta-area addresses are prioritized
4. Selected address populates the input
5. Console shows initialization and selection logs
6. No errors in console
7. Styling matches the luxury theme (beige/black/gold)

## Need Help?

If issues persist after following this guide:

1. **Take a screenshot** of the browser console
2. **Note the exact error message**
3. **Share what you typed** in the input field
4. **Check if other form fields work** (date, time, etc.)

This will help diagnose whether it's:
- A Mapbox API issue
- A network/loading issue
- A React component issue
- A styling/CSS issue
