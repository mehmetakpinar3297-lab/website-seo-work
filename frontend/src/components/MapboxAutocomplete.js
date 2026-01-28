import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId, required }) => {
  const containerRef = useRef(null);
  const [fallbackMode, setFallbackMode] = useState(false);

  useEffect(() => {
    if (fallbackMode || !containerRef.current) return;

    let geocoder = null;
    let loadTimeout = null;

    const loadMapbox = async () => {
      try {
        console.log(`[${id}] Starting Mapbox initialization...`);

        // Load CSS
        if (!document.getElementById('mapbox-css')) {
          const link = document.createElement('link');
          link.id = 'mapbox-css';
          link.rel = 'stylesheet';
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
          document.head.appendChild(link);
        }

        if (!document.getElementById('geocoder-css')) {
          const link = document.createElement('link');
          link.id = 'geocoder-css';
          link.rel = 'stylesheet';
          link.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css';
          document.head.appendChild(link);
        }

        // Load Mapbox GL
        if (!window.mapboxgl) {
          console.log(`[${id}] Loading Mapbox GL...`);
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
            script.onload = () => {
              console.log(`[${id}] Mapbox GL loaded`);
              resolve();
            };
            script.onerror = () => reject(new Error('Failed to load Mapbox GL'));
            document.body.appendChild(script);
          });
        }

        // Load Geocoder
        if (!window.MapboxGeocoder) {
          console.log(`[${id}] Loading Mapbox Geocoder...`);
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.onload = () => {
              console.log(`[${id}] Mapbox Geocoder loaded`);
              resolve();
            };
            script.onerror = () => reject(new Error('Failed to load Geocoder'));
            document.body.appendChild(script);
          });
        }

        // Wait for libraries to be ready
        await new Promise(resolve => setTimeout(resolve, 200));

        if (!window.mapboxgl || !window.MapboxGeocoder) {
          throw new Error('Mapbox libraries not available');
        }

        // Set access token
        window.mapboxgl.accessToken = MAPBOX_TOKEN;

        // Create geocoder
        console.log(`[${id}] Creating geocoder instance...`);
        geocoder = new window.MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          types: 'address,poi',
          countries: 'us',
          proximity: { longitude: -84.355350, latitude: 33.812713 },
          bbox: [-85.605165, 32.839052, -83.109869, 35.000771],
          placeholder: placeholder,
          autocomplete: true,
          minLength: 2
        });

        // Add to DOM
        if (!containerRef.current) return;
        
        geocoder.addTo(containerRef.current);
        console.log(`[${id}] Geocoder added to DOM`);

        // Handle events
        geocoder.on('result', (e) => {
          console.log(`[${id}] Address selected:`, e.result.place_name);
          onChange(e.result.place_name);
        });

        geocoder.on('results', (e) => {
          console.log(`[${id}] Got ${e.features.length} suggestions`);
        });

        geocoder.on('clear', () => {
          console.log(`[${id}] Input cleared`);
          onChange('');
        });

        // Set initial value
        if (value) {
          setTimeout(() => {
            const input = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (input) {
              input.value = value;
            }
          }, 100);
        }

        // Add required attribute
        if (required) {
          setTimeout(() => {
            const input = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (input) {
              input.setAttribute('required', 'required');
              input.setAttribute('data-testid', testId);
            }
          }, 100);
        }

        console.log(`[${id}] ✅ Autocomplete ready! Type to see suggestions.`);

      } catch (error) {
        console.error(`[${id}] Mapbox failed:`, error);
        setFallbackMode(true);
      }
    };

    // Start loading with timeout
    loadTimeout = setTimeout(() => {
      console.warn(`[${id}] Loading timeout - switching to fallback`);
      setFallbackMode(true);
    }, 10000);

    loadMapbox();

    return () => {
      if (loadTimeout) clearTimeout(loadTimeout);
      if (geocoder) {
        try {
          geocoder.onRemove();
        } catch (e) {
          console.error('Error removing geocoder:', e);
        }
      }
    };
  }, [fallbackMode, id, placeholder, required, testId]);

  // Fallback input
  if (fallbackMode) {
    console.log(`[${id}] Using fallback input`);
    return (
      <input
        type="text"
        id={id}
        data-testid={testId}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
      />
    );
  }

  return <div ref={containerRef} className="w-full" />;
};

export default MapboxAutocomplete;
