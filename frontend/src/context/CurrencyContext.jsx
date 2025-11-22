import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrencyFromPhone } from '../utils/currencyUtils';

// Create the context
const CurrencyContext = createContext();

/**
 * Currency Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const CurrencyProvider = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const [currency, setCurrency] = useState('INR');
  
  // Initialize currency from localStorage or user's phone
  useEffect(() => {
    const preferredCurrency = localStorage.getItem('preferredCurrency');
    
    if (preferredCurrency) {
      setCurrency(preferredCurrency);
    } else if (user?.phone) {
      const detectedCurrency = getCurrencyFromPhone(user.phone);
      setCurrency(detectedCurrency);
    }
  }, [user]);
  
  // Update currency
  const updateCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };
  
  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * Custom hook to use the currency context
 * @returns {Object} - Currency context value
 */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 