import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWVobWV0MzI5NyIsImEiOiJjbWt4NzlkNGgwNzBjM2RweHoxMHUxcDJ4In0.Q0lml9bRnMckk4WO-qsTOg';

const MapboxAutocomplete = ({ id, value, onChange, placeholder, testId, required }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Fetch suggestions from Mapbox API
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
        {
          params: {
            access_token: MAPBOX_TOKEN,
            country: 'us',
            types: 'address,poi',
            proximity: '-84.355350,33.812713', // Atlanta Airport
            bbox: '-85.605165,32.839052,-83.109869,35.000771', // Georgia bounds
            limit: 5,
            autocomplete: true
          }
        }
      );

      setSuggestions(response.data.features || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Mapbox API error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce API call
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    const address = suggestion.place_name;
    setInputValue(address);
    onChange(address);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div className="relative w-full">
      {/* Single Input Field */}
      <input
        ref={inputRef}
        type="text"
        id={id}
        data-testid={testId}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        className="w-full bg-transparent border-b-2 border-[#1B1B1B]/20 focus:border-[#B89D62] px-0 py-4 outline-none transition-colors placeholder:text-[#1B1B1B]/40 font-manrope text-[#1B1B1B]"
      />

      {/* Autocomplete Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 bg-white border border-[#1B1B1B]/10 shadow-lg mt-1 max-h-80 overflow-y-auto z-50"
          style={{ zIndex: 9999 }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.id || index}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="px-4 py-3 cursor-pointer hover:bg-[#F5F5F0] border-b border-[#1B1B1B]/5 last:border-b-0"
            >
              <div className="font-medium text-[#1B1B1B] font-manrope text-sm">
                {suggestion.text}
              </div>
              <div className="text-xs text-[#2C2C2C] font-manrope mt-1">
                {suggestion.place_name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="absolute right-0 top-4 text-[#B89D62] text-sm font-manrope">
          Searching...
        </div>
      )}
    </div>
  );
};

export default MapboxAutocomplete;
