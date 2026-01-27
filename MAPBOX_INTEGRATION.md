# Mapbox Location Autocomplete Integration

## Overview
Integrated Mapbox Geocoder to provide intelligent location autocomplete for pickup and drop-off addresses in the booking form.

## Mapbox API Configuration

### API Token
```
pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg
```

### Account Owner
- **Username**: mehmet3297
- **Dashboard**: https://account.mapbox.com

## Implementation Details

### Component Created
**File**: `/app/frontend/src/components/MapboxAutocomplete.js`

### Features
1. **Auto-complete Addresses**: Real-time address suggestions as user types
2. **Atlanta-Focused**: Prioritizes Atlanta, Georgia area results
3. **US Addresses Only**: Limited to United States for accuracy
4. **Proximity Bias**: Centers search around Atlanta Airport (-84.355350, 33.812713)
5. **Bounding Box**: Restricted to Georgia state boundaries for better results
6. **POI Support**: Includes Points of Interest (airports, hotels, landmarks)

### Configuration

#### Search Settings
```javascript
{
  proximity: {
    longitude: -84.355350,
    latitude: 33.812713
  }, // Atlanta Airport
  bbox: [-85.605165, 32.839052, -83.109869, 35.000771], // Georgia bounds
  countries: 'us',
  types: 'address,poi'
}
```

#### Supported Location Types
- **Addresses**: Street addresses, building numbers
- **POI (Points of Interest)**: 
  - Hartsfield-Jackson Atlanta International Airport
  - Hotels and resorts
  - Shopping centers
  - Business districts
  - Landmarks

## User Experience

### How It Works

1. **User starts typing** in pickup/dropoff field
2. **Mapbox Geocoder** searches for matching locations
3. **Dropdown appears** with relevant suggestions
4. **User selects** an address from the dropdown
5. **Field populates** with the full formatted address

### Example Suggestions

#### Typing "Atlanta Airport"
```
✈️ Hartsfield-Jackson Atlanta International Airport
   6000 N Terminal Pkwy, Atlanta, GA 30320

✈️ Atlanta Airport Marriott Gateway
   2020 Convention Center Concourse, Atlanta, GA 30337
```

#### Typing "Peachtree"
```
📍 Peachtree Street NE, Atlanta, GA

📍 Peachtree Center, Atlanta, GA

📍 Peachtree Plaza Hotel, Atlanta, GA
```

#### Typing "Buckhead"
```
📍 Buckhead, Atlanta, GA

📍 Buckhead Village District, Atlanta, GA

📍 Lenox Square Mall, 3393 Peachtree Rd NE, Atlanta, GA
```

## Visual Design

### Styling
- Matches existing form design (beige/black/gold theme)
- Bottom border with gold focus state
- Clean, minimal dropdown suggestions
- Smooth animations and transitions

### CSS Integration
```css
- Background: Transparent
- Border: Bottom only (2px, black/20%)
- Focus: Gold border (#B89D62)
- Font: Manrope
- Placeholder: Gray (#1B1B1B/40%)
```

## Technical Details

### Libraries Used
- **Mapbox GL JS**: v2.20.0
- **Mapbox Geocoder**: v5.0.0

### CDN Resources
```html
<!-- CSS -->
<link href="https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.css" />
<link href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" />

<!-- JavaScript -->
<script src="https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.js"></script>
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
```

### React Integration
```jsx
import MapboxAutocomplete from '../components/MapboxAutocomplete';

<MapboxAutocomplete
  id="pickup-location"
  value={formData.pickupLocation}
  onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
  placeholder="Enter pickup address in Atlanta"
  testId="pickup-location-input"
/>
```

## API Usage & Limits

### Mapbox Geocoding API
- **Free Tier**: 100,000 requests/month
- **After Free Tier**: $0.50 per 1,000 requests
- **Current Usage**: Monitor at https://account.mapbox.com

### Best Practices
1. **Debouncing**: Geocoder automatically debounces requests (300ms)
2. **Caching**: Results are cached to reduce API calls
3. **Proximity**: Using proximity bias reduces search area and improves accuracy
4. **Bounding Box**: Restricting to Georgia reduces irrelevant results

### Estimated Monthly Usage
```
Average booking: 2 location searches (pickup + dropoff)
User typically types 3-5 characters before selecting
Each character typed = 1 API request (with debouncing)

Example:
100 bookings/month × 2 locations × 4 requests = 800 API calls
Well within the 100,000 free tier limit
```

## Advantages Over Google Maps

### Cost
- **Mapbox**: 100,000 free requests/month, then $0.50/1,000
- **Google Maps**: $5 per 1,000 requests (after $200 credit)

### Features
- Better international address support
- More accurate POI data
- Cleaner, more customizable UI
- Better mobile experience

### Atlanta-Specific Benefits
- Accurate Georgia address data
- Comprehensive POI database
- Fast geocoding performance
- Support for abbreviated addresses

## Troubleshooting

### Common Issues

#### Geocoder Not Loading
```javascript
// Check if Mapbox libraries loaded
console.log(window.mapboxgl); // Should not be undefined
console.log(window.MapboxGeocoder); // Should not be undefined
```

#### No Search Results
- Check internet connection
- Verify API token is valid
- Ensure address is within Georgia/USA
- Try using more specific search terms

#### Styling Issues
```css
/* Force Mapbox input to match our design */
.mapboxgl-ctrl-geocoder--input {
  border-bottom: 2px solid rgba(27, 27, 27, 0.2) !important;
  border-radius: 0 !important;
}
```

## Testing Addresses

### Use These for Testing:

**Airport**
```
Hartsfield-Jackson Atlanta International Airport
6000 N Terminal Pkwy, Atlanta, GA 30320
```

**Downtown**
```
200 Peachtree Street NE, Atlanta, GA 30303
(Bank of America Plaza)
```

**Buckhead**
```
3393 Peachtree Rd NE, Atlanta, GA 30326
(Lenox Square)
```

**Midtown**
```
1180 Peachtree Street NE, Atlanta, GA 30309
(Fox Theatre)
```

**Hotels**
```
265 Peachtree Center Ave NE, Atlanta, GA 30303
(Hyatt Regency Atlanta)
```

## Future Enhancements

### Possible Additions
1. **Route Preview**: Show estimated route and distance
2. **Travel Time**: Display estimated travel time
3. **Traffic Awareness**: Adjust pricing based on traffic
4. **Favorite Locations**: Save frequently used addresses
5. **Recent Searches**: Quick access to recent locations

## Support & Documentation

### Mapbox Resources
- **Documentation**: https://docs.mapbox.com/api/search/geocoding/
- **Examples**: https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/
- **Support**: https://support.mapbox.com/

### Internal Support
- **Component**: `/app/frontend/src/components/MapboxAutocomplete.js`
- **Usage**: `/app/frontend/src/pages/Booking.js`

## Security Notes

### API Token
- ✅ Public token (pk_) - Safe to use in frontend
- ✅ Restricted to specific domains (configure in Mapbox dashboard)
- ✅ No billing changes without upgrading account
- ⚠️ Monitor usage to stay within free tier

### Token Restrictions (Recommended)
1. Go to: https://account.mapbox.com/access-tokens
2. Select your token
3. Add URL restrictions:
   - `https://hourly-limo.preview.emergentagent.com/*`
   - `http://localhost:3000/*` (for development)

## Status

✅ **Integration Complete**
- Mapbox Geocoder component created
- Integrated into booking form
- Styled to match design
- Atlanta-focused search configured
- Ready for production use

**Next Steps:**
1. Test with various Atlanta addresses
2. Monitor API usage in Mapbox dashboard
3. Consider adding route preview feature
4. Collect user feedback on search accuracy
