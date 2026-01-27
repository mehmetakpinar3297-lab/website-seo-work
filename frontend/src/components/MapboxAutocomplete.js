import React, { useEffect, useRef } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId }) => {
  const containerRef = useRef(null);
  const geocoderRef = useRef(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    // Ensure component is mounted and DOM is ready
    if (!containerRef.current || loadingRef.current) return;
    
    loadingRef.current = true;

    // Load Mapbox CSS - only once
    const loadStyles = () => {
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
    };

    // Load Mapbox GL JS and Geocoder
    const loadMapbox = async () => {
      try {
        // Check if already loaded
        if (window.mapboxgl && window.MapboxGeocoder) {
          initializeGeocoder();
          return;
        }

        // Load Mapbox GL
        if (!window.mapboxgl) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.20.0/mapbox-gl.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Mapbox GL'));
            document.body.appendChild(script);
          });
        }

        // Load Mapbox Geocoder
        if (!window.MapboxGeocoder) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
            script.onload = resolve;
            script.onerror = () => reject(new Error('Failed to load Mapbox Geocoder'));
            document.body.appendChild(script);
          });
        }

        // Initialize after both libraries are loaded
        initializeGeocoder();
      } catch (error) {
        console.error('Error loading Mapbox:', error);
        loadingRef.current = false;
      }
    };

    const initializeGeocoder = () => {
      // Double-check everything is ready
      if (!containerRef.current || geocoderRef.current || !window.mapboxgl || !window.MapboxGeocoder) {
        console.warn('Mapbox initialization skipped:', {
          hasContainer: !!containerRef.current,
          hasGeocoder: !!geocoderRef.current,
          hasMapboxGL: !!window.mapboxgl,
          hasMapboxGeocoder: !!window.MapboxGeocoder
        });
        return;
      }

      try {
        console.log(`Initializing Mapbox geocoder for ${id}`);
        window.mapboxgl.accessToken = MAPBOX_TOKEN;

        const geocoder = new window.MapboxGeocoder({
          accessToken: MAPBOX_TOKEN,
          mapboxgl: window.mapboxgl,
          placeholder: placeholder,
          proximity: {
            longitude: -84.355350,
            latitude: 33.812713
          }, // Atlanta Airport as center
          bbox: [-85.605165, 32.839052, -83.109869, 35.000771], // Georgia bounds
          countries: 'us',
          types: 'address,poi',
          marker: false,
          autocomplete: true,
          minLength: 2
        });

        geocoder.on('result', (e) => {
          console.log(`${id} - Address selected:`, e.result.place_name);
          onChange(e.result.place_name);
        });

        geocoder.on('clear', () => {
          console.log(`${id} - Input cleared`);
          onChange('');
        });

        geocoder.on('error', (e) => {
          console.error(`${id} - Geocoder error:`, e);
        });

        geocoder.addTo(containerRef.current);
        geocoderRef.current = geocoder;
        console.log(`${id} - Geocoder successfully initialized`);

        // Set initial value if exists
        if (value) {
          setTimeout(() => {
            const input = containerRef.current?.querySelector('input');
            if (input) {
              input.value = value;
              console.log(`${id} - Initial value set:`, value);
            }
          }, 100);
        }

        // Style the geocoder input to match our design
        setTimeout(() => {
          styleGeocoderInput();
        }, 100);

      } catch (error) {
        console.error(`${id} - Error initializing geocoder:`, error);
        loadingRef.current = false;
      }
    };

    const styleGeocoderInput = () => {
      if (!containerRef.current) return;

      const input = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder--input');
      if (input) {
        input.className = 'w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]';
        input.setAttribute('data-testid', testId);
        input.style.fontSize = '16px'; // Prevent zoom on iOS
      }

      // Hide the default geocoder container styling
      const geocoderContainer = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder');
      if (geocoderContainer) {
        geocoderContainer.style.width = '100%';
        geocoderContainer.style.maxWidth = 'none';
        geocoderContainer.style.boxShadow = 'none';
        geocoderContainer.style.border = 'none';
        geocoderContainer.style.borderRadius = '0';
        geocoderContainer.style.backgroundColor = 'transparent';
      }

      // Style suggestions dropdown
      const suggestions = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder--suggestion-list');
      if (suggestions) {
        suggestions.style.borderRadius = '0';
        suggestions.style.marginTop = '4px';
      }
    };

    // Wait for DOM to be fully ready
    if (document.readyState === 'complete') {
      loadStyles();
      loadMapbox();
    } else {
      window.addEventListener('load', () => {
        loadStyles();
        loadMapbox();
      });
    }

    return () => {
      if (geocoderRef.current) {
        try {
          geocoderRef.current.onRemove();
        } catch (e) {
          console.error('Error removing geocoder:', e);
        }
        geocoderRef.current = null;
      }
      loadingRef.current = false;
    };
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    if (containerRef.current && value !== undefined) {
      const input = containerRef.current.querySelector('input');
      if (input && input.value !== value) {
        input.value = value;
      }
    }
  }, [value]);

  return (
    <div 
      ref={containerRef} 
      id={id} 
      className="w-full mapbox-autocomplete-container"
    ></div>
  );
};

export default MapboxAutocomplete;
