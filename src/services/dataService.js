const API_BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.error || `API request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return data;
};

export const submitContactForm = (formData) => request('/api/public/contacts', {
  method: 'POST',
  body: JSON.stringify(formData)
});

export const getContactData = (token) => request('/api/admin/contacts', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const apiCall = (endpoint, options = {}) => request(endpoint, options);
