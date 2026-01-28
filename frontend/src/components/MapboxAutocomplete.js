import React, { useEffect, useRef } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId, required }) => {
  const inputRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    // Load Mapbox libraries
    const loadMapbox = async () => {
      try {
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
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
            script.onload = resolve;
            document.body.appendChild(script);
          });
        }

        // Load Geocoder
        if (!window.MapboxGeocoder) {
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.onload = resolve;
            document.body.appendChild(script);
          });
        }

        // Wait for libraries
        await new Promise(resolve => setTimeout(resolve, 200));

        if (!window.mapboxgl || !window.MapboxGeocoder) return;

        // Setup Mapbox
        window.mapboxgl.accessToken = MAPBOX_TOKEN;

        // Create geocoder
        const geocoder = new window.MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          types: 'address,poi',
          countries: 'us',
          proximity: { longitude: -84.355350, latitude: 33.812713 },
          bbox: [-85.605165, 32.839052, -83.109869, 35.000771],
          placeholder: placeholder,
          autocomplete: true,
          minLength: 2
        });

        geocoder.on('result', (e) => {
          onChange(e.result.place_name);
        });

        geocoder.on('clear', () => {
          onChange('');
        });

        // Attach to our input container
        if (inputRef.current) {
          geocoder.addTo(inputRef.current);
          geocoderRef.current = geocoder;

          // Apply custom styling after geocoder creates its input
          setTimeout(() => {
            const mapboxInput = inputRef.current.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (mapboxInput) {
              mapboxInput.setAttribute('data-testid', testId);
              if (required) {
                mapboxInput.setAttribute('required', 'required');
              }
              if (value) {
                mapboxInput.value = value;
              }
            }
          }, 100);

          console.log(`✅ ${id} autocomplete ready`);
        }
      } catch (error) {
        console.error('Mapbox load error:', error);
      }
    };

    loadMapbox();

    return () => {
      if (geocoderRef.current) {
        try {
          geocoderRef.current.onRemove();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  // Single container - Mapbox will create the input inside
  return <div ref={inputRef} className="w-full single-mapbox-input" />;
};

export default MapboxAutocomplete;
