import apiClient from './client';

export const contactAPI = {
  submitContactForm: (data) => apiClient.post('/contact', data),
  subscribeNewsletter: (data) => apiClient.post('/newsletter/subscribe', data),
  unsubscribeNewsletter: (data) => apiClient.post('/newsletter/unsubscribe', data),
};