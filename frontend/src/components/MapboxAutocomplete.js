import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId }) => {
  const containerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [useRegularInput, setUseRegularInput] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    // If we're using regular input, don't initialize Mapbox
    if (useRegularInput) return;

    // Set timeout to fallback to regular input if Mapbox doesn't load
    const fallbackTimeout = setTimeout(() => {
      if (!geocoderRef.current) {
        console.warn(`${id} - Mapbox failed to load, using regular input`);
        setUseRegularInput(true);
      }
    }, 5000); // 5 second timeout

    const initMapbox = async () => {
      if (!containerRef.current) return;

      try {
        // Load styles
        if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.css';
          document.head.appendChild(link);
        }

        if (!document.querySelector('link[href*="mapbox-gl-geocoder.css"]')) {
          const geocoderCSS = document.createElement('link');
          geocoderCSS.rel = 'stylesheet';
          geocoderCSS.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css';
          document.head.appendChild(geocoderCSS);
        }

        // Load Mapbox GL
        if (!window.mapboxgl) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.js';
            script.onload = resolve;
            script.onerror = () => {
              console.error('Failed to load Mapbox GL');
              setUseRegularInput(true);
              reject();
            };
            document.body.appendChild(script);
          });
        }

        // Load Geocoder
        if (!window.MapboxGeocoder) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.onload = resolve;
            script.onerror = () => {
              console.error('Failed to load Mapbox Geocoder');
              setUseRegularInput(true);
              reject();
            };
            document.body.appendChild(script);
          });
        }

        // Initialize geocoder
        if (window.mapboxgl && window.MapboxGeocoder && containerRef.current && !geocoderRef.current) {
          window.mapboxgl.accessToken = MAPBOX_TOKEN;

          const geocoder = new window.MapboxGeocoder({
            accessToken: MAPBOX_TOKEN,
            mapboxgl: window.mapboxgl,
            placeholder: placeholder,
            proximity: {
              longitude: -84.355350,
              latitude: 33.812713
            },
            bbox: [-85.605165, 32.839052, -83.109869, 35.000771],
            countries: 'us',
            types: 'address,poi',
            marker: false
          });

          geocoder.on('result', (e) => {
            const address = e.result.place_name;
            setInputValue(address);
            onChange(address);
          });

          geocoder.on('clear', () => {
            setInputValue('');
            onChange('');
          });

          geocoder.addTo(containerRef.current);
          geocoderRef.current = geocoder;

          clearTimeout(fallbackTimeout);

          // Style the input
          setTimeout(() => {
            const input = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder--input');
            if (input) {
              input.style.width = '100%';
              input.style.border = 'none';
              input.style.borderBottom = '2px solid rgba(27, 27, 27, 0.2)';
              input.style.borderRadius = '0';
              input.style.padding = '16px 0';
              input.style.fontSize = '16px';
              input.style.fontFamily = 'Manrope, sans-serif';
              input.style.backgroundColor = 'transparent';
              input.style.outline = 'none';
              input.setAttribute('data-testid', testId);
            }

            const container = containerRef.current?.querySelector('.mapboxgl-ctrl-geocoder');
            if (container) {
              container.style.width = '100%';
              container.style.maxWidth = '100%';
              container.style.boxShadow = 'none';
            }
          }, 100);
        }
      } catch (error) {
        console.error('Error initializing Mapbox:', error);
        setUseRegularInput(true);
      }
    };

    initMapbox();

    return () => {
      clearTimeout(fallbackTimeout);
      if (geocoderRef.current) {
        try {
          geocoderRef.current.onRemove();
        } catch (e) {
          console.error('Error removing geocoder:', e);
        }
        geocoderRef.current = null;
      }
    };
  }, [useRegularInput]);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  // If Mapbox failed to load, use regular input
  if (useRegularInput) {
    return (
      <input
        type="text"
        id={id}
        data-testid={testId}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        required
        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
      />
    );
  }

  return (
    <div ref={containerRef} className="w-full mapbox-autocomplete-container"></div>
  );
};

export default MapboxAutocomplete;
