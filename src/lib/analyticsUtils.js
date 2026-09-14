const TZ_COUNTRY = {
  'Asia/Kolkata': { country: 'India', region: 'South Asia' },
  'Asia/Calcutta': { country: 'India', region: 'South Asia' },
  'America/New_York': { country: 'United States', region: 'North America' },
  'America/Chicago': { country: 'United States', region: 'North America' },
  'America/Los_Angeles': { country: 'United States', region: 'North America' },
  'America/Denver': { country: 'United States', region: 'North America' },
  'Europe/London': { country: 'United Kingdom', region: 'Europe' },
  'Europe/Paris': { country: 'France', region: 'Europe' },
  'Europe/Berlin': { country: 'Germany', region: 'Europe' },
  'Europe/Amsterdam': { country: 'Netherlands', region: 'Europe' },
  'Europe/Madrid': { country: 'Spain', region: 'Europe' },
  'Europe/Rome': { country: 'Italy', region: 'Europe' },
  'Europe/Dublin': { country: 'Ireland', region: 'Europe' },
  'Asia/Dubai': { country: 'United Arab Emirates', region: 'Middle East' },
  'Asia/Singapore': { country: 'Singapore', region: 'Southeast Asia' },
  'Asia/Tokyo': { country: 'Japan', region: 'East Asia' },
  'Asia/Shanghai': { country: 'China', region: 'East Asia' },
  'Asia/Hong_Kong': { country: 'Hong Kong', region: 'East Asia' },
  'Australia/Sydney': { country: 'Australia', region: 'Oceania' },
  'America/Toronto': { country: 'Canada', region: 'North America' },
  'America/Sao_Paulo': { country: 'Brazil', region: 'South America' },
  'Africa/Johannesburg': { country: 'South Africa', region: 'Africa' },
  'Asia/Karachi': { country: 'Pakistan', region: 'South Asia' },
  'Asia/Dhaka': { country: 'Bangladesh', region: 'South Asia' },
  'Asia/Colombo': { country: 'Sri Lanka', region: 'South Asia' },
  'Asia/Kathmandu': { country: 'Nepal', region: 'South Asia' }
};

export function resolveGeo({ timezone, language } = {}) {
  if (timezone && TZ_COUNTRY[timezone]) return TZ_COUNTRY[timezone];
  if (language?.toLowerCase().startsWith('hi')) return { country: 'India', region: 'South Asia' };
  if (language?.toLowerCase().startsWith('en-gb')) return { country: 'United Kingdom', region: 'Europe' };
  if (language?.toLowerCase().startsWith('en-us')) return { country: 'United States', region: 'North America' };
  return { country: 'Unknown', region: 'Global' };
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
