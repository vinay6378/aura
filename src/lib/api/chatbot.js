import apiClient from './client';

export const chatbotAPI = {
  sendMessage: (data) => apiClient.post('/chatbot/message', data),
  saveConversation: (data) => apiClient.post('/chatbot/save', data),
};