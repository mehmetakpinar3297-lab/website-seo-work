import React, { useEffect, useRef } from 'react';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId }) => {
  const containerRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    // Load Mapbox CSS
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

    // Load Mapbox GL JS
    const loadMapbox = async () => {
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
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // Load Mapbox Geocoder
      if (!window.MapboxGeocoder) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      initializeGeocoder();
    };

    const initializeGeocoder = () => {
      if (!containerRef.current || geocoderRef.current) return;

      window.mapboxgl.accessToken = MAPBOX_TOKEN;

      const geocoder = new window.MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        mapboxgl: window.mapboxgl,
        placeholder: placeholder,
        proximity: {
          longitude: -84.355350,
          latitude: 33.812713
        }, // Atlanta Airport as center
        bbox: [-85.605165, 32.839052, -83.109869, 35.000771], // Georgia bounds for better results
        countries: 'us',
        types: 'address,poi',
        marker: false
      });

      geocoder.on('result', (e) => {
        onChange(e.result.place_name);
      });

      geocoder.on('clear', () => {
        onChange('');
      });

      geocoder.addTo(containerRef.current);
      geocoderRef.current = geocoder;

      // Set initial value if exists
      if (value) {
        const input = containerRef.current.querySelector('input');
        if (input) {
          input.value = value;
        }
      }

      // Style the geocoder input to match our design
      const input = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder--input');
      if (input) {
        input.className = 'w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]';
        input.setAttribute('data-testid', testId);
      }

      // Hide the default geocoder container styling
      const geocoderContainer = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder');
      if (geocoderContainer) {
        geocoderContainer.style.width = '100%';
        geocoderContainer.style.maxWidth = 'none';
        geocoderContainer.style.boxShadow = 'none';
        geocoderContainer.style.border = 'none';
        geocoderContainer.style.borderRadius = '0';
      }
    };

    loadMapbox();

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.onRemove();
        geocoderRef.current = null;
      }
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

  return <div ref={containerRef} id={id} className="w-full"></div>;
};

export default MapboxAutocomplete;
