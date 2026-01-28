import React, { useEffect, useRef, useState } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let geocoder = null;

    const loadMapboxLibraries = async () => {
      try {
        // Load CSS
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
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        // Load Geocoder Plugin
        if (!window.MapboxGeocoder) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        // Wait a bit for libraries to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        if (!window.mapboxgl || !window.MapboxGeocoder) {
          throw new Error('Mapbox libraries not loaded');
        }

        // Initialize
        window.mapboxgl.accessToken = MAPBOX_TOKEN;

        geocoder = new window.MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          types: 'address,poi',
          countries: 'us',
          proximity: {
            longitude: -84.355350,
            latitude: 33.812713
          },
          bbox: [-85.605165, 32.839052, -83.109869, 35.000771],
          placeholder: placeholder,
          autocomplete: true,
          minLength: 2,
          limit: 5
        });

        // Add to container
        if (containerRef.current) {
          geocoder.addTo(containerRef.current);

          // Handle result selection
          geocoder.on('result', (e) => {
            onChange(e.result.place_name);
          });

          geocoder.on('clear', () => {
            onChange('');
          });

          // Set initial value
          if (value) {
            const input = containerRef.current.querySelector('input');
            if (input) {
              input.value = value;
            }
          }

          // Apply custom styling
          setTimeout(() => {
            const input = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder--input');
            const container = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder');
            
            if (input) {
              input.setAttribute('data-testid', testId);
              input.style.width = '100%';
              input.style.fontSize = '16px';
              input.style.fontFamily = 'Manrope, sans-serif';
              input.style.padding = '16px 0px';
              input.style.border = 'none';
              input.style.borderBottom = '2px solid rgba(27, 27, 27, 0.2)';
              input.style.borderRadius = '0';
              input.style.backgroundColor = 'transparent';
              input.style.color = '#1B1B1B';
              
              input.addEventListener('focus', () => {
                input.style.borderBottomColor = '#B89D62';
              });
              
              input.addEventListener('blur', () => {
                input.style.borderBottomColor = 'rgba(27, 27, 27, 0.2)';
              });
            }
            
            if (container) {
              container.style.width = '100%';
              container.style.maxWidth = '100%';
              container.style.boxShadow = 'none';
              container.style.fontSize = '16px';
            }

            // Style the suggestions dropdown
            const suggestions = containerRef.current.querySelector('.suggestions-wrapper');
            if (suggestions) {
              suggestions.style.zIndex = '1000';
            }
          }, 200);

          console.log(`Mapbox autocomplete initialized for ${id}`);
        }
      } catch (error) {
        console.error('Failed to load Mapbox:', error);
        setShowFallback(true);
      }
    };

    loadMapboxLibraries();

    return () => {
      if (geocoder) {
        geocoder.onRemove();
      }
    };
  }, []);

  // Fallback regular input if Mapbox fails
  if (showFallback) {
    return (
      <input
        ref={inputRef}
        type="text"
        id={id}
        data-testid={testId}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      id={id}
      className="w-full"
      style={{ position: 'relative' }}
    />
  );
};

export default MapboxAutocomplete;
