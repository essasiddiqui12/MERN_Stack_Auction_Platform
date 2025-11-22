/**
 * Currency utilities for conversion and formatting
 */

// Currency conversion rates (relative to INR as base)
// These rates should ideally come from an API in a production environment
export const CURRENCY_RATES = {
  INR: 1,      // Indian Rupee (base currency)
  USD: 0.012,  // US Dollar
  EUR: 0.011,  // Euro
  GBP: 0.0095, // British Pound
  AED: 0.044,  // UAE Dirham
  SAR: 0.045,  // Saudi Riyal
  SGD: 0.016,  // Singapore Dollar
  MYR: 0.056,  // Malaysian Ringgit
  CNY: 0.087,  // Chinese Yuan
  JPY: 1.79,   // Japanese Yen
  AUD: 0.018,  // Australian Dollar
  CAD: 0.016,  // Canadian Dollar
  NZD: 0.020,  // New Zealand Dollar
  THB: 0.43,   // Thai Baht
  KRW: 16.25,  // South Korean Won
  RUB: 1.09,   // Russian Ruble
  ZAR: 0.22,   // South African Rand
  BRL: 0.067,  // Brazilian Real
  MXN: 0.22,   // Mexican Peso
  IDR: 189.5,  // Indonesian Rupiah
  PHP: 0.68,   // Philippine Peso
  VND: 300.5,  // Vietnamese Dong
  EGP: 0.37,   // Egyptian Pound
  NGN: 17.8,   // Nigerian Naira
  KES: 1.54,   // Kenyan Shilling
  UGX: 44.5,   // Ugandan Shilling
  TZS: 30.5,   // Tanzanian Shilling
};

// Currency symbols and formatting options
export const CURRENCY_CONFIG = {
  INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
  USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
  EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
  GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
  AED: { locale: 'ar-AE', currency: 'AED', symbol: 'د.إ' },
  SAR: { locale: 'ar-SA', currency: 'SAR', symbol: 'ر.س' },
  SGD: { locale: 'en-SG', currency: 'SGD', symbol: 'S$' },
  MYR: { locale: 'ms-MY', currency: 'MYR', symbol: 'RM' },
  CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
  JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
  AUD: { locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
  CAD: { locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
  NZD: { locale: 'en-NZ', currency: 'NZD', symbol: 'NZ$' },
  THB: { locale: 'th-TH', currency: 'THB', symbol: '฿' },
  KRW: { locale: 'ko-KR', currency: 'KRW', symbol: '₩' },
  RUB: { locale: 'ru-RU', currency: 'RUB', symbol: '₽' },
  ZAR: { locale: 'en-ZA', currency: 'ZAR', symbol: 'R' },
  BRL: { locale: 'pt-BR', currency: 'BRL', symbol: 'R$' },
  MXN: { locale: 'es-MX', currency: 'MXN', symbol: 'Mex$' },
  IDR: { locale: 'id-ID', currency: 'IDR', symbol: 'Rp' },
  PHP: { locale: 'en-PH', currency: 'PHP', symbol: '₱' },
  VND: { locale: 'vi-VN', currency: 'VND', symbol: '₫' },
  EGP: { locale: 'ar-EG', currency: 'EGP', symbol: 'E£' },
  NGN: { locale: 'en-NG', currency: 'NGN', symbol: '₦' },
  KES: { locale: 'en-KE', currency: 'KES', symbol: 'KSh' },
  UGX: { locale: 'en-UG', currency: 'UGX', symbol: 'USh' },
  TZS: { locale: 'en-TZ', currency: 'TZS', symbol: 'TSh' },
};

/**
 * Map country code to currency code
 * This maps phone country codes to their respective currency codes
 */
export const COUNTRY_TO_CURRENCY = {
  '+91': 'INR',  // India
  '+1': 'USD',   // United States
  '+44': 'GBP',  // United Kingdom
  '+971': 'AED', // United Arab Emirates
  '+966': 'SAR', // Saudi Arabia
  '+65': 'SGD',  // Singapore
  '+60': 'MYR',  // Malaysia
  '+86': 'CNY',  // China
  '+81': 'JPY',  // Japan
  '+61': 'AUD',  // Australia
  '+64': 'NZD',  // New Zealand
  '+66': 'THB',  // Thailand
  '+82': 'KRW',  // South Korea
  '+7': 'RUB',   // Russia
  '+27': 'ZAR',  // South Africa
  '+55': 'BRL',  // Brazil
  '+52': 'MXN',  // Mexico
  '+62': 'IDR',  // Indonesia
  '+63': 'PHP',  // Philippines
  '+84': 'VND',  // Vietnam
  '+20': 'EGP',  // Egypt
  '+234': 'NGN', // Nigeria
  '+254': 'KES', // Kenya
  '+256': 'UGX', // Uganda
  '+255': 'TZS', // Tanzania
  // Add more mappings as needed
};

/**
 * Convert amount from INR to target currency
 * @param {number} amountInINR - Amount in INR
 * @param {string} targetCurrency - Target currency code
 * @returns {number} - Converted amount in target currency
 */
export const convertCurrency = (amountInINR, targetCurrency = 'INR') => {
  if (!CURRENCY_RATES[targetCurrency]) {
    console.warn(`Currency rate not found for ${targetCurrency}, using INR`);
    return amountInINR;
  }
  
  return amountInINR * CURRENCY_RATES[targetCurrency];
};

/**
 * Format amount in specified currency
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code
 * @returns {string} - Formatted amount with currency symbol
 */
export const formatAmountInCurrency = (amount, currencyCode = 'INR') => {
  if (!CURRENCY_CONFIG[currencyCode]) {
    console.warn(`Currency config not found for ${currencyCode}, using INR`);
    currencyCode = 'INR';
  }
  
  const { locale, currency } = CURRENCY_CONFIG[currencyCode];
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: currency === 'JPY' || currency === 'KRW' || currency === 'VND' ? 0 : 2
  }).format(amount);
};

/**
 * Get user's currency code from phone number
 * @param {string} phoneNumber - User's phone number with country code
 * @returns {string} - Currency code
 */
export const getCurrencyFromPhone = (phoneNumber) => {
  if (!phoneNumber) return 'INR'; // Default to INR
  
  // Extract country code from phone number
  const countryCodeMatch = phoneNumber.match(/^\+\d+/);
  if (!countryCodeMatch) return 'INR';
  
  const countryCode = countryCodeMatch[0];
  
  // Find the currency for this country code
  for (const [code, currency] of Object.entries(COUNTRY_TO_CURRENCY)) {
    if (countryCode === code || phoneNumber.startsWith(code)) {
      return currency;
    }
  }
  
  return 'INR'; // Default to INR if no match found
}; 