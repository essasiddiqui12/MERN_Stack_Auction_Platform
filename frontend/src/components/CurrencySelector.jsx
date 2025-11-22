import React, { useState, useEffect, useRef } from 'react';
import { CURRENCY_CONFIG } from '../utils/currencyUtils';
import { useCurrency } from '../context/CurrencyContext';

/**
 * Component to display and select currency
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 */
const CurrencySelector = ({ className = '' }) => {
  const { currency, updateCurrency } = useCurrency();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Handle currency selection
  const handleCurrencySelect = (currencyCode) => {
    updateCurrency(currencyCode);
    setIsDropdownOpen(false);
  };
  
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
  
  // Get available currencies
  const currencies = Object.keys(CURRENCY_CONFIG);
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center justify-between px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md hover:bg-white/20 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="mr-2">{CURRENCY_CONFIG[currency].symbol}</span>
        <span>{currency}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 max-h-60 overflow-y-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-md shadow-lg z-50">
          {currencies.map((currencyCode) => (
            <div
              key={currencyCode}
              className={`flex items-center w-full px-4 py-2 text-left text-white hover:bg-white/20 cursor-pointer ${
                currency === currencyCode ? 'bg-white/20' : ''
              }`}
              onClick={() => handleCurrencySelect(currencyCode)}
            >
              <span className="mr-2">{CURRENCY_CONFIG[currencyCode].symbol}</span>
              <span>{currencyCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector; 