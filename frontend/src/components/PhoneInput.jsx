import React, { useState, useEffect, useRef } from 'react';
import { countryCodes, validatePhoneNumber, detectCountryFromNumber } from '../utils/countryCodes';

const PhoneInput = ({ value, onChange, className, label = "Phone number" }) => {
  const [countryCode, setCountryCode] = useState("+1"); // Default to US
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dropdownRef = useRef(null);
  
  // Find the selected country object
  const selectedCountry = countryCodes.find(country => country.code === countryCode) || countryCodes[0];
  
  // Initialize with provided value if any
  useEffect(() => {
    if (value && typeof value === 'string') {
      const detectedCountry = detectCountryFromNumber(value);
      if (detectedCountry) {
        setCountryCode(detectedCountry.code);
        // Extract phone number part (remove country code and spaces)
        const phoneNumberPart = value.replace(detectedCountry.code, '').trim();
        setPhoneNumber(phoneNumberPart);
      }
    }
  }, [value]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update parent component with formatted value
  useEffect(() => {
    if (onChange) {
      onChange(`${countryCode} ${phoneNumber}`);
    }
  }, [countryCode, phoneNumber, onChange]);
  
  // Handle phone number input
  const handlePhoneNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setPhoneNumber(input);
    
    // Validate phone number
    if (input.length > 0) {
      const isValidNumber = validatePhoneNumber(input, countryCode);
      setIsValid(isValidNumber || input.length < selectedCountry.maxLength);
      
      if (!isValidNumber && input.length === selectedCountry.maxLength) {
        setErrorMessage(`Invalid phone number format for ${selectedCountry.name}`);
      } else {
        setErrorMessage("");
      }
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };
  
  // Handle country selection
  const handleCountrySelect = (country) => {
    setCountryCode(country.code);
    setIsDropdownOpen(false);
  };
  
  // Dropdown styles to ensure visibility
  const dropdownStyles = {
    position: 'absolute',
    top: '100%',
    left: '0',
    width: '300px',
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 9999,
    display: isDropdownOpen ? 'block' : 'none'
  };
  
  return (
    <div className="relative w-full">
      {label && <label className="block text-[16px] text-stone-500 mb-2">{label}</label>}
      
      <div className={`flex rounded-md ${!isValid ? 'border-red-500' : ''} ${className}`}>
        {/* Country code dropdown button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center justify-between px-3 py-2 bg-gray-50 border-r border-gray-300 text-gray-700 rounded-l-md"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="mr-2">{selectedCountry.flag}</span>
            <span>{countryCode}</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          {/* Country dropdown */}
          <div style={dropdownStyles}>
            {countryCodes.map((country) => (
              <div
                key={country.code}
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCountrySelect(country)}
              >
                <div className="flex items-center flex-grow">
                  <span className="mr-2">{country.flag}</span>
                  <span className="mr-2">{country.name}</span>
                  <span className="text-gray-500">{country.code}</span>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{country.placeholder}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Phone number input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="flex-1 p-2 focus:outline-none focus:ring-2 focus:ring-[#D6482B] rounded-r-md"
          placeholder={selectedCountry.placeholder}
        />
      </div>
      
      {/* Error message */}
      {!isValid && errorMessage && (
        <p className="mt-1 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      
      {/* Helper text */}
      <p className="mt-1 text-xs text-gray-500">
        Format: {countryCode} {selectedCountry.placeholder}
      </p>
    </div>
  );
};

export default PhoneInput; 