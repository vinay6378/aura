import apiClient from './client';

export const portfolioAPI = {
  getItems: (params) => apiClient.get('/portfolio/items', { params }),
  getItemBySlug: (slug) => apiClient.get(`/portfolio/items/${slug}`),
};