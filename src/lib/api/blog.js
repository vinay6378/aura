import apiClient from './client';

export const blogAPI = {
  getPosts: (params) => apiClient.get('/blog/posts', { params }),
  getPostBySlug: (slug) => apiClient.get(`/blog/posts/${slug}`),
  getCategories: () => apiClient.get('/blog/categories'),
};