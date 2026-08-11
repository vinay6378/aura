// Input validation and sanitization utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-+()]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const validateLength = (value, min, max) => {
  const length = value ? value.toString().length : 0;
  return length >= min && length <= max;
};

export const validateServiceName = (name) => {
  if (!validateRequired(name)) return false;
  if (!validateLength(name, 2, 100)) return false;
  return /^[a-zA-Z0-9\s\-_.]+$/.test(name);
};

export const validatePrice = (price) => {
  if (!validateRequired(price)) return false;
  return /^[\d$.,\s]+$/.test(price);
};

export const sanitizeContactForm = (formData) => {
  return {
    name: sanitizeInput(formData.name),
    email: sanitizeInput(formData.email),
    phone: sanitizeInput(formData.phone),
    company: sanitizeInput(formData.company),
    service: sanitizeInput(formData.service),
    message: sanitizeInput(formData.message),
    budget: sanitizeInput(formData.budget),
    timeline: sanitizeInput(formData.timeline)
  };
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  if (!validateRequired(formData.name)) {
    errors.name = 'Name is required';
  } else if (!validateLength(formData.name, 2, 100)) {
    errors.name = 'Name must be between 2 and 100 characters';
  }
  
  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!validateRequired(formData.message)) {
    errors.message = 'Message is required';
  } else if (!validateLength(formData.message, 10, 1000)) {
    errors.message = 'Message must be between 10 and 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeUserData = (userData) => {
  return {
    name: sanitizeInput(userData.name),
    email: sanitizeInput(userData.email),
    role: ['admin', 'editor', 'viewer'].includes(userData.role) ? userData.role : 'viewer',
    status: ['active', 'inactive'].includes(userData.status) ? userData.status : 'active'
  };
};

export const sanitizeServiceData = (serviceData) => {
  return {
    name: sanitizeInput(serviceData.name),
    category: sanitizeInput(serviceData.category),
    price: sanitizeInput(serviceData.price),
    description: sanitizeInput(serviceData.description),
    status: ['active', 'inactive'].includes(serviceData.status) ? serviceData.status : 'active'
  };
};

export const sanitizeSettingsData = (settingsData) => {
  return {
    siteName: sanitizeInput(settingsData.siteName),
    siteDescription: sanitizeInput(settingsData.siteDescription),
    contactEmail: validateEmail(settingsData.contactEmail) ? settingsData.contactEmail : '',
    phoneNumber: sanitizeInput(settingsData.phoneNumber),
    socialLinks: {
      facebook: validateURL(settingsData.socialLinks?.facebook) ? settingsData.socialLinks.facebook : '',
      twitter: validateURL(settingsData.socialLinks?.twitter) ? settingsData.socialLinks.twitter : '',
      linkedin: validateURL(settingsData.socialLinks?.linkedin) ? settingsData.socialLinks.linkedin : ''
    },
    maintenanceMode: typeof settingsData.maintenanceMode === 'boolean' ? settingsData.maintenanceMode : false
  };
};