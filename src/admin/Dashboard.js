import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';
import { sanitizeServiceData, sanitizeUserData, sanitizeSettingsData } from '../utils/validation';
import '../styles/index.css';
import './admin.css';
import DataManager from './dataManager';

const Dashboard = ({ onLogout }) => {
  const [activeModule, setActiveModule] = useState('overview');
  
  // Initialize data on mount
  useEffect(() => {
    DataManager.initializeData();
  }, []);

  const modules = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'contacts', name: 'Contact Forms', icon: '📧' },
    { id: 'services', name: 'Services', icon: '⚙️' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'settings', name: 'Settings', icon: '⚡' },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'contacts':
        return <ContactModule />;
      case 'services':
        return <ServiceModule />;
      case 'users':
        return <UsersModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="admin-container flex">
      {/* Sidebar */}
      <div className="admin-sidebar w-64 min-h-screen p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">AURA</h1>
          <p className="text-purple-400 text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {modules.map((module) => (
            <div
              key={module.id}
              className={`admin-nav-item ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => setActiveModule(module.id)}
            >
              <span>{module.icon}</span>
              <span>{module.name}</span>
            </div>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="admin-nav-item text-red-400 hover:text-red-300" onClick={onLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          key={activeModule}
        >
          {renderModule()}
        </motion.div>
      </div>
    </div>
  );
};

const OverviewModule = () => {
  const contacts = DataManager.getData('admin_contacts');
  const services = DataManager.getData('admin_services');
  const users = DataManager.getData('admin_users');
  const analytics = DataManager.getAnalytics();

  return (
    <div>
      <div className="admin-header">
        <h2>Dashboard Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{contacts.length}</div>
          <div className="admin-stat-label">Contact Submissions</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{services.length}</div>
          <div className="admin-stat-label">Active Services</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{users.length}</div>
          <div className="admin-stat-label">Total Users</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{analytics.visitors?.today || 0}</div>
          <div className="admin-stat-label">Today's Visitors</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="admin-card">
          <h3 className="text-white text-lg font-semibold mb-4">Visitor Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Today's Visitors</span>
              <span className="text-white font-semibold">{analytics.visitors?.today || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Weekly Visitors</span>
              <span className="text-white font-semibold">{analytics.visitors?.week || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Monthly Visitors</span>
              <span className="text-white font-semibold">{analytics.visitors?.month || 0}</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-white text-lg font-semibold mb-4">Conversion Rate</h3>
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{analytics.conversionRate || '0%'}</div>
              <div className="text-purple-300 text-sm">Conversion Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white">New contact form submission</p>
              <p className="text-purple-300 text-sm">2 hours ago</p>
            </div>
            <span className="admin-badge admin-badge-success">New</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white">Service updated: Web Development</p>
              <p className="text-purple-300 text-sm">5 hours ago</p>
            </div>
            <span className="admin-badge admin-badge-warning">Updated</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-white">New project added: E-commerce Platform</p>
              <p className="text-purple-300 text-sm">1 day ago</p>
            </div>
            <span className="admin-badge admin-badge-success">Created</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalyticsModule = () => {
  const analytics = DataManager.getAnalytics();

  const handleExport = () => {
    const data = {
      exportDate: new Date().toISOString(),
      analytics: analytics
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Analytics Dashboard</h2>
        <button className="admin-btn admin-btn-primary" onClick={handleExport}>📥 Export Data</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{analytics.visitors?.today || 0}</div>
          <div className="admin-stat-label">Today's Visitors</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{analytics.pageViews?.today || 0}</div>
          <div className="admin-stat-label">Today's Page Views</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{analytics.formsSubmitted?.today || 0}</div>
          <div className="admin-stat-label">Forms Submitted</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{analytics.conversionRate || '0%'}</div>
          <div className="admin-stat-label">Conversion Rate</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="text-white text-lg font-semibold mb-4">Visitor Trends</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Today</span>
              <span className="text-white font-semibold">{analytics.visitors?.today || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">This Week</span>
              <span className="text-white font-semibold">{analytics.visitors?.week || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">This Month</span>
              <span className="text-white font-semibold">{analytics.visitors?.month || 0}</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-white text-lg font-semibold mb-4">Page Views</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-purple-300">Today</span>
              <span className="text-white font-semibold">{analytics.pageViews?.today || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">This Week</span>
              <span className="text-white font-semibold">{analytics.pageViews?.week || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300">This Month</span>
              <span className="text-white font-semibold">{analytics.pageViews?.month || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactModule = () => {
  const [contacts, setContacts] = useState(DataManager.getData('admin_contacts'));
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setContacts(DataManager.getData('admin_contacts'));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      DataManager.deleteItem('admin_contacts', id);
      setContacts(DataManager.getData('admin_contacts'));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    DataManager.updateItem('admin_contacts', id, { status: newStatus });
    setContacts(DataManager.getData('admin_contacts'));
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const handleReply = (contact) => {
    window.open(`mailto:${contact.email}?subject=Re: ${contact.subject}`);
  };

  const handleExport = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalContacts: contacts.length,
      contacts: contacts
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Contact Form Submissions</h2>
        <div className="flex gap-2">
          <button className="admin-btn admin-btn-primary" onClick={handleExport}>📥 Export All</button>
        </div>
      </div>

      {isLoading ? (
        <Loading text="Loading contacts..." />
      ) : (
        <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.subject}</td>
                <td>
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                    className="bg-white/10 border border-purple-400/30 rounded px-2 py-1 text-white text-sm"
                  >
                    <option value="new" className="bg-gray-800">New</option>
                    <option value="pending" className="bg-gray-800">Pending</option>
                    <option value="completed" className="bg-gray-800">Completed</option>
                  </select>
                </td>
                <td>{contact.date}</td>
                <td>
                  <button className="admin-btn admin-btn-primary mr-2" onClick={() => handleView(contact)}>View</button>
                  <button className="admin-btn admin-btn-primary mr-2" onClick={() => handleReply(contact)}>📧</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(contact.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {showModal && selectedContact && (
        <div className="admin-modal" onClick={() => setShowModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white text-xl font-semibold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-purple-300 text-sm">Name</label>
                <p className="text-white">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-purple-300 text-sm">Email</label>
                <p className="text-white">{selectedContact.email}</p>
              </div>
              <div>
                <label className="text-purple-300 text-sm">Subject</label>
                <p className="text-white">{selectedContact.subject}</p>
              </div>
              <div>
                <label className="text-purple-300 text-sm">Message</label>
                <p className="text-white">{selectedContact.message}</p>
              </div>
              <div>
                <label className="text-purple-300 text-sm">Date</label>
                <p className="text-white">{selectedContact.date}</p>
              </div>
            </div>
            <button className="admin-btn admin-btn-primary mt-6" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ServiceModule = () => {
  const [services, setServices] = useState(DataManager.getData('admin_services'));
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setServices(DataManager.getData('admin_services'));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      DataManager.deleteItem('admin_services', id);
      setServices(DataManager.getData('admin_services'));
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleSave = (serviceData) => {
    const sanitizedData = sanitizeServiceData(serviceData);
    if (editingService) {
      DataManager.updateItem('admin_services', editingService.id, sanitizedData);
    } else {
      DataManager.addItem('admin_services', sanitizedData);
    }
    setServices(DataManager.getData('admin_services'));
    setShowModal(false);
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Service Management</h2>
        <button className="admin-btn admin-btn-primary" onClick={handleAdd}>Add Service</button>
      </div>

      {isLoading ? (
        <Loading text="Loading services..." />
      ) : (
        <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price}</td>
                <td>
                  <span className={`admin-badge admin-badge-${service.status === 'active' ? 'success' : 'danger'}`}>
                    {service.status}
                  </span>
                </td>
                <td>
                  <button className="admin-btn admin-btn-primary mr-2" onClick={() => handleEdit(service)}>Edit</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {showModal && (
        <ServiceModal
          service={editingService}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const UsersModule = () => {
  const [users, setUsers] = useState(DataManager.getData('admin_users'));
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(DataManager.getData('admin_users'));
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      DataManager.deleteItem('admin_users', id);
      setUsers(DataManager.getData('admin_users'));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleSave = (userData) => {
    const sanitizedData = sanitizeUserData(userData);
    if (editingUser) {
      DataManager.updateItem('admin_users', editingUser.id, sanitizedData);
    } else {
      DataManager.addItem('admin_users', sanitizedData);
    }
    setUsers(DataManager.getData('admin_users'));
    setShowModal(false);
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'admin-badge-danger',
      editor: 'admin-badge-warning',
      viewer: 'admin-badge-success'
    };
    return colors[role] || 'admin-badge-success';
  };

  return (
    <div>
      <div className="admin-header">
        <h2>User Management</h2>
        <button className="admin-btn admin-btn-primary" onClick={handleAdd}>Add User</button>
      </div>

      {isLoading ? (
        <Loading text="Loading users..." />
      ) : (
        <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`admin-badge ${getRoleBadge(user.role)}`}>{user.role}</span>
                </td>
                <td>
                  <span className={`admin-badge admin-badge-${user.status === 'active' ? 'success' : 'danger'}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.date}</td>
                <td>
                  <button className="admin-btn admin-btn-primary mr-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {showModal && (
        <UserModal
          user={editingUser}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const SettingsModule = () => {
  const [settings, setSettings] = useState(DataManager.getSettings());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setSettings(DataManager.getSettings());
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSave = () => {
    setIsLoading(true);
    const sanitizedSettings = sanitizeSettingsData(settings);
    DataManager.updateSettings(sanitizedSettings);
    setTimeout(() => {
      setIsLoading(false);
      alert('Settings saved successfully!');
    }, 500);
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSocialChange = (platform, value) => {
    setSettings({
      ...settings,
      socialLinks: { ...settings.socialLinks, [platform]: value }
    });
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Site Settings</h2>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {isLoading ? (
        <Loading text="Loading settings..." />
      ) : (
        <>
          <div className="admin-card">
        <h3 className="text-white text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="admin-form-group">
            <label>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => handleChange('siteDescription', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={settings.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="text-white text-lg font-semibold mb-4">Social Media Links</h3>
        <div className="space-y-4">
          <div className="admin-form-group">
            <label>Facebook</label>
            <input
              type="url"
              value={settings.socialLinks?.facebook || ''}
              onChange={(e) => handleSocialChange('facebook', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>Twitter</label>
            <input
              type="url"
              value={settings.socialLinks?.twitter || ''}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
            />
          </div>
          <div className="admin-form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={settings.socialLinks?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="text-white text-lg font-semibold mb-4">System Settings</h3>
        <div className="flex items-center justify-between">
          <span className="text-white">Maintenance Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
        </>
      )}
    </div>
  );
};

// Modal Components
const ServiceModal = ({ service, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    service || { name: '', category: '', price: '', description: '', status: 'active' }
  );

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({ name: '', category: '', price: '', description: '', status: 'active' });
    }
  }, [service]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white text-xl font-semibold mb-4">
          {service ? 'Edit Service' : 'Add New Service'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="admin-form-group">
            <label>Service Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Creative">Creative</option>
              <option value="Content">Content</option>
              <option value="Specialized">Specialized</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Price</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="admin-btn admin-btn-primary">Save</button>
            <button type="button" className="admin-btn admin-btn-danger" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    user || { name: '', email: '', role: 'editor', status: 'active' }
  );

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({ name: '', email: '', role: 'editor', status: 'active' });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="admin-modal" onClick={onClose}>
      <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white text-xl font-semibold mb-4">
          {user ? 'Edit User' : 'Add New User'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="admin-form-group">
            <label>Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="admin-btn admin-btn-primary">Save</button>
            <button type="button" className="admin-btn admin-btn-danger" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;