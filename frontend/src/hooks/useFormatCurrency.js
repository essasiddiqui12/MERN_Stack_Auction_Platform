import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatAmountInCurrency } from '../utils/currencyUtils';

/**
 * Custom hook to format currency using the current currency context
 * @returns {Function} - Function to format amounts in the current currency
 */
export const useFormatCurrency = () => {
  const { currency } = useCurrency();
  
  /**
   * Format an amount in the current currency
   * @param {number} amount - Amount in INR to format
   * @param {string} forceCurrency - Optional override currency
   * @returns {string} - Formatted amount
   */
  const formatCurrency = (amount, forceCurrency) => {
    const currencyToUse = forceCurrency || currency;
    const convertedAmount = convertCurrency(amount, currencyToUse);
    return formatAmountInCurrency(convertedAmount, currencyToUse);
  };
  
  return formatCurrency;
}; 