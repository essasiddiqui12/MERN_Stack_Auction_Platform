import { convertCurrency, formatAmountInCurrency, getCurrencyFromPhone } from './currencyUtils';

/**
 * Formats a number as currency based on user's country or preference
 * @param {number} amount - The amount to format (in INR)
 * @param {string} userPhone - User's phone number with country code (optional)
 * @param {string} forceCurrency - Force a specific currency code (optional)
 * @returns {string} - The formatted amount in the appropriate currency
 */
export const formatCurrency = (amount, userPhone, forceCurrency) => {
  // Check if there's a preferred currency in localStorage
  const preferredCurrency = localStorage.getItem('preferredCurrency');
  
  // If a specific currency is forced, use that
  if (forceCurrency) {
    const convertedAmount = convertCurrency(amount, forceCurrency);
    return formatAmountInCurrency(convertedAmount, forceCurrency);
  }
  
  // If there's a preferred currency in localStorage, use that
  if (preferredCurrency) {
    const convertedAmount = convertCurrency(amount, preferredCurrency);
    return formatAmountInCurrency(convertedAmount, preferredCurrency);
  }
  
  // If user phone is provided, detect currency from it
  if (userPhone) {
    const currencyCode = getCurrencyFromPhone(userPhone);
    const convertedAmount = convertCurrency(amount, currencyCode);
    return formatAmountInCurrency(convertedAmount, currencyCode);
  }
  
  // Default to INR
  return formatAmountInCurrency(amount, 'INR');
}; 