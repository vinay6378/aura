// Data Management Utility for Admin Panel
const DataManager = {
  // Initialize default data
  initializeData() {
    if (!localStorage.getItem('admin_contacts')) {
      localStorage.setItem('admin_contacts', JSON.stringify([
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Web Development', message: 'I need a website for my business', status: 'new', date: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', subject: 'Digital Marketing', message: 'Interested in marketing services', status: 'pending', date: '2024-01-14' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', subject: 'Mobile App', message: 'Need iOS and Android app', status: 'completed', date: '2024-01-13' },
      ]));
    }

    if (!localStorage.getItem('admin_services')) {
      localStorage.setItem('admin_services', JSON.stringify([
        { id: 1, name: 'Web Development', category: 'Development', price: '$200+', description: 'Custom website development', status: 'active' },
        { id: 2, name: 'Software Development', category: 'Development', price: '$300+', description: 'Custom software solutions', status: 'active' },
        { id: 3, name: 'Mobile Application', category: 'Development', price: '$400+', description: 'iOS and Android app development', status: 'active' },
        { id: 4, name: 'Data Science', category: 'Development', price: '$500+', description: 'Data analysis and machine learning', status: 'active' },
        { id: 5, name: 'Brand Identity Development', category: 'Creative', price: '$400+', description: 'Complete brand identity solutions', status: 'active' },
        { id: 6, name: 'Photo & Image Editing', category: 'Creative', price: '$200+', description: 'Professional photo editing services', status: 'active' },
        { id: 7, name: 'Print-Ready Design', category: 'Creative', price: '$300+', description: 'Professional print materials design', status: 'active' },
        { id: 8, name: 'Architectural & Solar Designs', category: 'Creative', price: '$200+', description: '2D & 3D architectural and solar designs', status: 'active' },
        { id: 9, name: 'Digital Marketing', category: 'Marketing', price: '$300+', description: 'SEO and social media marketing', status: 'active' },
        { id: 10, name: 'Social Media Content', category: 'Marketing', price: '$250+', description: 'Social media content creation', status: 'active' },
        { id: 11, name: 'Online Ad Campaigns', category: 'Marketing', price: '$400+', description: 'Online advertising campaign management', status: 'active' },
        { id: 12, name: 'Influencer Marketing', category: 'Marketing', price: '$500+', description: 'Influencer partnership management', status: 'active' },
        { id: 13, name: 'Business Content Writing', category: 'Content', price: '$150+', description: 'Professional business content creation', status: 'active' },
        { id: 14, name: 'Book & Ebook Publishing', category: 'Content', price: '$350+', description: 'Complete publishing services', status: 'active' },
        { id: 15, name: 'Professional Photography', category: 'Specialized', price: '$200+', description: 'Professional photography services', status: 'active' },
      ]));
    }

    if (!localStorage.getItem('admin_projects')) {
      localStorage.setItem('admin_projects', JSON.stringify([
        { id: 1, name: 'E-commerce Platform', client: 'Tech Corp', description: 'Full-stack e-commerce solution', status: 'completed', date: '2024-01-10', budget: '$5,000' },
        { id: 2, name: 'Mobile Banking App', client: 'Finance Plus', description: 'Secure mobile banking application', status: 'in-progress', date: '2024-01-08', budget: '$7,000' },
        { id: 3, name: 'Corporate Website', client: 'Business Inc', description: 'Professional corporate website', status: 'pending', date: '2024-01-05', budget: '$8,000' },
      ]));
    }

    if (!localStorage.getItem('admin_content')) {
      localStorage.setItem('admin_content', JSON.stringify([
        { id: 1, title: 'About Us', page: '/about', description: 'We are a leading digital agency...', lastUpdated: '2024-01-12' },
        { id: 2, title: 'Services', page: '/services', description: 'Our services include web development...', lastUpdated: '2024-01-10' },
        { id: 3, title: 'Contact', page: '/contact', description: 'Get in touch with us...', lastUpdated: '2024-01-08' },
      ]));
    }

    if (!localStorage.getItem('admin_users')) {
      localStorage.setItem('admin_users', JSON.stringify([
        { id: 1, name: 'Admin User', email: 'admin@aura.com', role: 'admin', status: 'active', date: '2024-01-01' },
        { id: 2, name: 'Editor User', email: 'editor@aura.com', role: 'editor', status: 'active', date: '2024-01-05' },
      ]));
    }

    if (!localStorage.getItem('admin_settings')) {
      localStorage.setItem('admin_settings', JSON.stringify({
        siteName: 'AURA DIGITAL',
        siteDescription: 'Transform your digital presence',
        contactEmail: 'contact@aura.com',
        phoneNumber: '+1 234 567 890',
        socialLinks: {
          facebook: 'https://facebook.com/aura',
          twitter: 'https://twitter.com/aura',
          linkedin: 'https://linkedin.com/company/aura',
        },
        maintenanceMode: false,
      }));
    }

    if (!localStorage.getItem('admin_analytics')) {
      localStorage.setItem('admin_analytics', JSON.stringify({
        visitors: { today: 145, week: 892, month: 3421 },
        pageViews: { today: 423, week: 2156, month: 8934 },
        formsSubmitted: { today: 5, week: 24, month: 89 },
        conversionRate: '3.2%',
      }));
    }

    if (!localStorage.getItem('admin_media')) {
      localStorage.setItem('admin_media', JSON.stringify([
        { id: 1, name: 'logo.png', type: 'image', size: '45KB', url: '/images/logo.png', date: '2024-01-15' },
        { id: 2, name: 'hero-bg.jpg', type: 'image', size: '1.2MB', url: '/images/hero-bg.jpg', date: '2024-01-14' },
        { id: 3, name: 'document.pdf', type: 'document', size: '234KB', url: '/docs/document.pdf', date: '2024-01-13' },
      ]));
    }
  },

  // Generic CRUD operations
  getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Add item
  addItem(key, item) {
    const data = this.getData(key);
    const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
    const newItem = { ...item, id: newId, date: new Date().toISOString().split('T')[0], lastUpdated: new Date().toISOString().split('T')[0] };
    data.push(newItem);
    this.setData(key, data);
    return newItem;
  },

  // Update item
  updateItem(key, id, updatedItem) {
    const data = this.getData(key);
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...updatedItem, lastUpdated: new Date().toISOString().split('T')[0] };
      this.setData(key, data);
      return data[index];
    }
    return null;
  },

  // Delete item
  deleteItem(key, id) {
    const data = this.getData(key);
    const filteredData = data.filter(item => item.id !== id);
    this.setData(key, filteredData);
    return filteredData;
  },

  // Get item by ID
  getItemById(key, id) {
    const data = this.getData(key);
    return data.find(item => item.id === id);
  },

  // Settings specific
  getSettings() {
    return JSON.parse(localStorage.getItem('admin_settings')) || {};
  },

  updateSettings(settings) {
    localStorage.setItem('admin_settings', JSON.stringify(settings));
  },

  // Analytics specific
  getAnalytics() {
    return JSON.parse(localStorage.getItem('admin_analytics')) || {};
  },

  updateAnalytics(analytics) {
    localStorage.setItem('admin_analytics', JSON.stringify(analytics));
  },
};

export default DataManager;