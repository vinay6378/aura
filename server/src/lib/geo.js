const TZ_COUNTRY = {
  'Asia/Kolkata': { country: 'India', region: 'South Asia', code: 'IN' },
  'Asia/Calcutta': { country: 'India', region: 'South Asia', code: 'IN' },
  'America/New_York': { country: 'United States', region: 'North America', code: 'US' },
  'America/Chicago': { country: 'United States', region: 'North America', code: 'US' },
  'America/Los_Angeles': { country: 'United States', region: 'North America', code: 'US' },
  'America/Denver': { country: 'United States', region: 'North America', code: 'US' },
  'Europe/London': { country: 'United Kingdom', region: 'Europe', code: 'GB' },
  'Europe/Paris': { country: 'France', region: 'Europe', code: 'FR' },
  'Europe/Berlin': { country: 'Germany', region: 'Europe', code: 'DE' },
  'Europe/Amsterdam': { country: 'Netherlands', region: 'Europe', code: 'NL' },
  'Europe/Madrid': { country: 'Spain', region: 'Europe', code: 'ES' },
  'Europe/Rome': { country: 'Italy', region: 'Europe', code: 'IT' },
  'Europe/Dublin': { country: 'Ireland', region: 'Europe', code: 'IE' },
  'Asia/Dubai': { country: 'United Arab Emirates', region: 'Middle East', code: 'AE' },
  'Asia/Singapore': { country: 'Singapore', region: 'Southeast Asia', code: 'SG' },
  'Asia/Tokyo': { country: 'Japan', region: 'East Asia', code: 'JP' },
  'Asia/Shanghai': { country: 'China', region: 'East Asia', code: 'CN' },
  'Asia/Hong_Kong': { country: 'Hong Kong', region: 'East Asia', code: 'HK' },
  'Australia/Sydney': { country: 'Australia', region: 'Oceania', code: 'AU' },
  'America/Toronto': { country: 'Canada', region: 'North America', code: 'CA' },
  'America/Sao_Paulo': { country: 'Brazil', region: 'South America', code: 'BR' },
  'Africa/Johannesburg': { country: 'South Africa', region: 'Africa', code: 'ZA' },
  'Asia/Karachi': { country: 'Pakistan', region: 'South Asia', code: 'PK' },
  'Asia/Dhaka': { country: 'Bangladesh', region: 'South Asia', code: 'BD' },
  'Asia/Colombo': { country: 'Sri Lanka', region: 'South Asia', code: 'LK' },
  'Asia/Kathmandu': { country: 'Nepal', region: 'South Asia', code: 'NP' }
};

export function resolveGeo({ timezone, language, country } = {}) {
  if (country) {
    return { country, region: 'Reported', code: country.slice(0, 2).toUpperCase() };
  }
  if (timezone && TZ_COUNTRY[timezone]) return TZ_COUNTRY[timezone];
  if (language?.toLowerCase().startsWith('hi')) {
    return { country: 'India', region: 'South Asia', code: 'IN' };
  }
  if (language?.toLowerCase().startsWith('en-gb')) {
    return { country: 'United Kingdom', region: 'Europe', code: 'GB' };
  }
  if (language?.toLowerCase().startsWith('en-us')) {
    return { country: 'United States', region: 'North America', code: 'US' };
  }
  return { country: 'Unknown', region: 'Global', code: 'XX' };
}

export function parseDevice(ua = '') {
  const u = ua.toLowerCase();
  let device = 'desktop';
  if (/tablet|ipad/.test(u)) device = 'tablet';
  else if (/mobi|android|iphone/.test(u)) device = 'mobile';

  let browser = 'Other';
  if (u.includes('edg/')) browser = 'Edge';
  else if (u.includes('chrome')) browser = 'Chrome';
  else if (u.includes('safari')) browser = 'Safari';
  else if (u.includes('firefox')) browser = 'Firefox';

  let os = 'Other';
  if (u.includes('windows')) os = 'Windows';
  else if (u.includes('mac os')) os = 'macOS';
  else if (u.includes('android')) os = 'Android';
  else if (u.includes('iphone') || u.includes('ipad')) os = 'iOS';
  else if (u.includes('linux')) os = 'Linux';

  return { device, browser, os };
}
