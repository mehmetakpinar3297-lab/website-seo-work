import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId, required }) => {
  const containerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [isMapboxReady, setIsMapboxReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    if (useFallback) return;

    let mounted = true;

    const initMapbox = async () => {
      try {
        // Load CSS files
        if (!document.getElementById('mapbox-gl-css')) {
          const link = document.createElement('link');
          link.id = 'mapbox-gl-css';
          link.rel = 'stylesheet';
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
          document.head.appendChild(link);
        }

        if (!document.getElementById('mapbox-geocoder-css')) {
          const geocoderCSS = document.createElement('link');
          geocoderCSS.id = 'mapbox-geocoder-css';
          geocoderCSS.rel = 'stylesheet';
          geocoderCSS.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css';
          document.head.appendChild(geocoderCSS);
        }

        // Load Mapbox GL JS
        if (!window.mapboxgl) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        // Load Geocoder
        if (!window.MapboxGeocoder) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        if (!mounted) return;

        // Small delay to ensure libraries are ready
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!window.mapboxgl || !window.MapboxGeocoder) {
          throw new Error('Mapbox libraries failed to load');
        }

        // Initialize geocoder
        window.mapboxgl.accessToken = MAPBOX_TOKEN;

        const geocoder = new window.MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          types: 'address,poi',
          countries: 'us',
          proximity: { longitude: -84.355350, latitude: 33.812713 },
          bbox: [-85.605165, 32.839052, -83.109869, 35.000771],
          placeholder: placeholder,
          autocomplete: true,
          minLength: 2,
          limit: 5
        });

        if (!containerRef.current || !mounted) return;

        geocoder.addTo(containerRef.current);
        geocoderRef.current = geocoder;

        geocoder.on('result', (e) => {
          onChange(e.result.place_name);
        });

        geocoder.on('clear', () => {
          onChange('');
        });

        // Set initial value if exists
        if (value) {
          setTimeout(() => {
            const input = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (input) {
              input.value = value;
            }
          }, 100);
        }

        // Add required attribute if needed
        if (required) {
          setTimeout(() => {
            const input = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (input) {
              input.setAttribute('required', 'required');
            }
          }, 100);
        }

        setIsMapboxReady(true);
        console.log(`✅ Mapbox loaded for ${id}`);

      } catch (error) {
        console.error('Mapbox initialization failed:', error);
        if (mounted) {
          setUseFallback(true);
        }
      }
    };

    // Set timeout for fallback
    const fallbackTimer = setTimeout(() => {
      if (!isMapboxReady && mounted) {
        console.warn(`${id}: Mapbox timeout, using fallback`);
        setUseFallback(true);
      }
    }, 8000);

    initMapbox();

    return () => {
      mounted = false;
      clearTimeout(fallbackTimer);
      if (geocoderRef.current) {
        try {
          geocoderRef.current.onRemove();
        } catch (e) {
          console.error('Error removing geocoder:', e);
        }
        geocoderRef.current = null;
      }
    };
  }, [useFallback]);

  // Fallback to regular input if Mapbox fails
  if (useFallback) {
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

  // Render Mapbox container (it will create its own input)
  return (
    <div 
      ref={containerRef}
      className="w-full mapbox-container"
    />
  );
};

export default MapboxAutocomplete;
