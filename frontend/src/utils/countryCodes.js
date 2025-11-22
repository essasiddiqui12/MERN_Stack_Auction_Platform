/**
 * Country codes and phone number validation rules
 * Format:
 * - code: Country calling code (e.g., +1 for US)
 * - name: Country name
 * - flag: Country flag emoji
 * - regex: Regex pattern for validation (excluding country code)
 * - placeholder: Example phone number format
 * - maxLength: Maximum length of phone number (excluding country code)
 */
export const countryCodes = [
  {
    code: "+91",
    name: "India",
    flag: "🇮🇳",
    regex: /^[6-9]\d{9}$/,
    placeholder: "9XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    regex: /^\d{10}$/,
    placeholder: "XXX-XXX-XXXX",
    maxLength: 10
  },
  {
    code: "+44",
    name: "United Kingdom",
    flag: "🇬🇧",
    regex: /^7\d{9}$/,
    placeholder: "7XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+355",
    name: "Albania",
    flag: "🇦🇱",
    regex: /^[67]\d{7}$/,
    placeholder: "6XXXXXXX",
    maxLength: 8
  },
  {
    code: "+213",
    name: "Algeria",
    flag: "🇩🇿",
    regex: /^[567]\d{8}$/,
    placeholder: "5XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+1264",
    name: "Anguilla",
    flag: "🇦🇮",
    regex: /^\d{7}$/,
    placeholder: "XXXXXXX",
    maxLength: 7
  },
  {
    code: "+1268",
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    regex: /^\d{7}$/,
    placeholder: "XXXXXXX",
    maxLength: 7
  },
  {
    code: "+54",
    name: "Argentina",
    flag: "🇦🇷",
    regex: /^9\d{8}$/,
    placeholder: "9XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+374",
    name: "Armenia",
    flag: "🇦🇲",
    regex: /^[49]\d{7}$/,
    placeholder: "9XXXXXXX",
    maxLength: 8
  },
  {
    code: "+297",
    name: "Aruba",
    flag: "🇦🇼",
    regex: /^\d{7}$/,
    placeholder: "XXXXXXX",
    maxLength: 7
  },
  {
    code: "+247",
    name: "Ascension Island",
    flag: "🇦🇨",
    regex: /^\d{4}$/,
    placeholder: "XXXX",
    maxLength: 4
  },
  {
    code: "+61",
    name: "Australia",
    flag: "🇦🇺",
    regex: /^4\d{8}$/,
    placeholder: "4XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+43",
    name: "Austria",
    flag: "🇦🇹",
    regex: /^6\d{8}$/,
    placeholder: "6XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+994",
    name: "Azerbaijan",
    flag: "🇦🇿",
    regex: /^[47]\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+1242",
    name: "Bahamas",
    flag: "🇧🇸",
    regex: /^\d{7}$/,
    placeholder: "XXXXXXX",
    maxLength: 7
  },
  {
    code: "+973",
    name: "Bahrain",
    flag: "🇧🇭",
    regex: /^[3569]\d{7}$/,
    placeholder: "3XXXXXXX",
    maxLength: 8
  },
  {
    code: "+880",
    name: "Bangladesh",
    flag: "🇧🇩",
    regex: /^1\d{9}$/,
    placeholder: "1XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+971",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    regex: /^5\d{8}$/,
    placeholder: "5XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+966",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    regex: /^5\d{8}$/,
    placeholder: "5XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+65",
    name: "Singapore",
    flag: "🇸🇬",
    regex: /^[89]\d{7}$/,
    placeholder: "8XXXXXXX",
    maxLength: 8
  },
  {
    code: "+60",
    name: "Malaysia",
    flag: "🇲🇾",
    regex: /^1\d{8,9}$/,
    placeholder: "1XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+64",
    name: "New Zealand",
    flag: "🇳🇿",
    regex: /^2\d{7,8}$/,
    placeholder: "2XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+86",
    name: "China",
    flag: "🇨🇳",
    regex: /^1\d{10}$/,
    placeholder: "1XXXXXXXXXX",
    maxLength: 11
  },
  {
    code: "+81",
    name: "Japan",
    flag: "🇯🇵",
    regex: /^[789]0\d{8}$/,
    placeholder: "90XXXXXXXX",
    maxLength: 10
  },
  {
    code: "+82",
    name: "South Korea",
    flag: "🇰🇷",
    regex: /^1\d{8,9}$/,
    placeholder: "1XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+49",
    name: "Germany",
    flag: "🇩🇪",
    regex: /^1\d{10,11}$/,
    placeholder: "1XXXXXXXXXXX",
    maxLength: 12
  },
  {
    code: "+33",
    name: "France",
    flag: "🇫🇷",
    regex: /^[67]\d{8}$/,
    placeholder: "6XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+39",
    name: "Italy",
    flag: "🇮🇹",
    regex: /^3\d{9}$/,
    placeholder: "3XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+34",
    name: "Spain",
    flag: "🇪🇸",
    regex: /^[6-7]\d{8}$/,
    placeholder: "6XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+7",
    name: "Russia",
    flag: "🇷🇺",
    regex: /^9\d{9}$/,
    placeholder: "9XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+55",
    name: "Brazil",
    flag: "🇧🇷",
    regex: /^[1-9]{2}9\d{8}$/,
    placeholder: "XX9XXXXXXXX",
    maxLength: 11
  },
  {
    code: "+52",
    name: "Mexico",
    flag: "🇲🇽",
    regex: /^[1-9]\d{9}$/,
    placeholder: "XXXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+27",
    name: "South Africa",
    flag: "🇿🇦",
    regex: /^[67-8]\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+92",
    name: "Pakistan",
    flag: "🇵🇰",
    regex: /^3\d{9}$/,
    placeholder: "3XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+94",
    name: "Sri Lanka",
    flag: "🇱🇰",
    regex: /^7\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+977",
    name: "Nepal",
    flag: "🇳🇵",
    regex: /^9\d{9}$/,
    placeholder: "9XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+95",
    name: "Myanmar",
    flag: "🇲🇲",
    regex: /^9\d{8,9}$/,
    placeholder: "9XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+63",
    name: "Philippines",
    flag: "🇵🇭",
    regex: /^9\d{9}$/,
    placeholder: "9XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+84",
    name: "Vietnam",
    flag: "🇻🇳",
    regex: /^(3|5|7|8|9)\d{8}$/,
    placeholder: "9XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+62",
    name: "Indonesia",
    flag: "🇮🇩",
    regex: /^8\d{9,10}$/,
    placeholder: "8XXXXXXXXXX",
    maxLength: 11
  },
  {
    code: "+66",
    name: "Thailand",
    flag: "🇹🇭",
    regex: /^[689]\d{8}$/,
    placeholder: "8XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+20",
    name: "Egypt",
    flag: "🇪🇬",
    regex: /^1\d{9}$/,
    placeholder: "1XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+234",
    name: "Nigeria",
    flag: "🇳🇬",
    regex: /^[789]\d{9}$/,
    placeholder: "8XXXXXXXXX",
    maxLength: 10
  },
  {
    code: "+254",
    name: "Kenya",
    flag: "🇰🇪",
    regex: /^7\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+256",
    name: "Uganda",
    flag: "🇺🇬",
    regex: /^7\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+255",
    name: "Tanzania",
    flag: "🇹🇿",
    regex: /^[67]\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+351",
    name: "Portugal",
    flag: "🇵🇹",
    regex: /^9\d{8}$/,
    placeholder: "9XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+31",
    name: "Netherlands",
    flag: "🇳🇱",
    regex: /^6\d{8}$/,
    placeholder: "6XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+32",
    name: "Belgium",
    flag: "🇧🇪",
    regex: /^4\d{8}$/,
    placeholder: "4XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+41",
    name: "Switzerland",
    flag: "🇨🇭",
    regex: /^7\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+46",
    name: "Sweden",
    flag: "🇸🇪",
    regex: /^7\d{8}$/,
    placeholder: "7XXXXXXXX",
    maxLength: 9
  },
  {
    code: "+47",
    name: "Norway",
    flag: "🇳🇴",
    regex: /^4\d{7}$/,
    placeholder: "4XXXXXXX",
    maxLength: 8
  },
  {
    code: "+45",
    name: "Denmark",
    flag: "🇩🇰",
    regex: /^[2-9]\d{7}$/,
    placeholder: "5XXXXXXX",
    maxLength: 8
  }
];

// Sort countries alphabetically by name
countryCodes.sort((a, b) => a.name.localeCompare(b.name));

/**
 * Validates a phone number based on the selected country's rules
 * @param {string} phoneNumber - The phone number to validate (without country code)
 * @param {string} countryCode - The country code (e.g., +91)
 * @returns {boolean} - Whether the phone number is valid
 */
export const validatePhoneNumber = (phoneNumber, countryCode) => {
  const country = countryCodes.find(country => country.code === countryCode);
  if (!country) return false;
  return country.regex.test(phoneNumber);
};

/**
 * Formats a full phone number with country code
 * @param {string} phoneNumber - The phone number (without country code)
 * @param {string} countryCode - The country code (e.g., +91)
 * @returns {string} - The formatted full phone number
 */
export const formatFullPhoneNumber = (phoneNumber, countryCode) => {
  return `${countryCode} ${phoneNumber}`;
};

/**
 * Gets a country by its code
 * @param {string} countryCode - The country code (e.g., +91)
 * @returns {Object|null} - The country object or null if not found
 */
export const getCountryByCode = (countryCode) => {
  return countryCodes.find(country => country.code === countryCode) || null;
};

/**
 * Gets a country by its name
 * @param {string} countryName - The country name
 * @returns {Object|null} - The country object or null if not found
 */
export const getCountryByName = (countryName) => {
  return countryCodes.find(country => 
    country.name.toLowerCase() === countryName.toLowerCase()
  ) || null;
};

/**
 * Detects the country code from a full phone number
 * @param {string} fullPhoneNumber - The full phone number with country code
 * @returns {Object|null} - The detected country object or null if not detected
 */
export const detectCountryFromNumber = (fullPhoneNumber) => {
  if (!fullPhoneNumber) return null;
  
  // Clean the input
  const cleanNumber = fullPhoneNumber.replace(/\s+/g, '');
  
  // Try to match country codes from longest to shortest to avoid false matches
  const sortedCodes = [...countryCodes].sort((a, b) => 
    b.code.length - a.code.length
  );
  
  for (const country of sortedCodes) {
    if (cleanNumber.startsWith(country.code)) {
      return country;
    }
  }
  
  return null;
}; 