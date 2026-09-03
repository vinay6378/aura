import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalInquiries: 0,
    pendingInquiries: 0,
    inReview: 0,
    contacted: 0,
    completed: 0,
    serviceBreakdown: [],
    timeline: []
  });
  const [contacts, setContacts] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [realTimeStatus, setRealTimeStatus] = useState('disconnected');
  const [searchTerm, setSearchTerm] = useState('');
  const [exportLoading, setExportLoading] = useState(false);

  const authHeader = useCallback(() => {
    const token = localStorage.getItem('aura_admin_token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('aura_admin_token');
    localStorage.removeItem('aura_admin_user');
    navigate('/admin/login');
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Always use real Python API
      const [statsRes, contactsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/stats', authHeader()),
        axios.get(`http://localhost:5000/api/contacts?status=${statusFilter}`, authHeader())
      ]);
      setStats(statsRes.data || {
        totalInquiries: 0,
        pendingInquiries: 0,
        inReview: 0,
        contacted: 0,
        completed: 0,
        serviceBreakdown: [],
        timeline: []
      });
      setContacts(Array.isArray(contactsRes.data?.contacts) ? contactsRes.data.contacts : []);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
      // Set default values on error
      setStats({
        totalInquiries: 0,
        pendingInquiries: 0,
        inReview: 0,
        contacted: 0,
        completed: 0,
        serviceBreakdown: [],
        timeline: []
      });
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [authHeader, statusFilter]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Initialize Socket.IO connection for real-time updates
  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    setSocket(newSocket);
    setRealTimeStatus('connecting');
    
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setRealTimeStatus('connected');
      newSocket.emit('join_admin_room', { room: 'admin' });
    });
    
    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setRealTimeStatus('disconnected');
    });
    
    // Listen for new contact submissions
    newSocket.on('new_contact', (data) => {
      console.log('New contact received:', data);
      // Refresh contacts to show new submission
      fetchDashboardData();
      // Show notification
      alert(`New inquiry from ${data.name} - ${data.subject}`);
    });
    
    // Listen for stats updates
    newSocket.on('stats_update', (data) => {
      console.log('Stats updated:', data);
      setStats(prev => ({
        ...prev,
        ...data
      }));
    });
    
    // Listen for contact updates
    newSocket.on('contact_updated', (data) => {
      console.log('Contact updated:', data);
      fetchDashboardData();
    });
    
    return () => {
      newSocket.disconnect();
    };
  }, [fetchDashboardData]);

  const fetchUsers = useCallback(async () => {
    try {
      // Always use real Python API
      const res = await axios.get('http://localhost:5000/api/users', authHeader());
      setAdminUsers(Array.isArray(res.data?.users) ? res.data.users : []);
    } catch (err) {
      console.error(err);
      setAdminUsers([]);
    }
  }, [authHeader]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab, fetchUsers]);

  const handleStatusChange = async (contactId, newStatus) => {
    setActionLoading(true);
    try {
      // Always use real Python API
      await axios.patch('http://localhost:5000/api/contacts', { id: contactId, status: newStatus }, authHeader());
      fetchDashboardData();
    } catch (err) {
      alert('Failed to update inquiry status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    setActionLoading(true);
    try {
      // Always use real Python API
      await axios.delete(`http://localhost:5000/api/contacts?id=${contactId}`, authHeader());
      fetchDashboardData();
    } catch (err) {
      alert('Failed to delete inquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this admin account permanently?')) return;
    setActionLoading(true);
    try {
      // Always use real Python API
      await axios.delete(`http://localhost:5000/api/users?id=${userId}`, authHeader());
      fetchUsers();
    } catch (err) {
      alert('Failed to delete admin account.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter contacts based on search term
  const filteredContacts = (contacts || []).filter(contact => {
    const searchLower = searchTerm.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.subject?.toLowerCase().includes(searchLower) ||
      contact.company?.toLowerCase().includes(searchLower) ||
      contact.service?.toLowerCase().includes(searchLower)
    );
  });

  // Export contacts to CSV
  const handleExportContacts = async () => {
    setExportLoading(true);
    try {
      const csvContent = [
        ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Subject', 'Status', 'Created At'],
        ...filteredContacts.map(c => [
          c.id,
          c.name,
          c.email,
          c.phone || '',
          c.company || '',
          c.service || '',
          c.subject,
          c.status,
          c.created_at
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aura_contacts_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to export contacts.');
    } finally {
      setExportLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-800';
      case 'contacted':
        return 'bg-cyan-950/70 text-cyan-400 border-cyan-800';
      case 'in_review':
        return 'bg-amber-950/70 text-amber-400 border-amber-800';
      default:
        return 'bg-rose-950/70 text-rose-400 border-rose-800';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AURA Digital
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full font-mono">
            Control Center
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Real-time Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              realTimeStatus === 'connected' ? 'bg-emerald-400 animate-pulse' :
              realTimeStatus === 'connecting' ? 'bg-amber-400 animate-pulse' :
              'bg-rose-400'
            }`}></div>
            <span className="text-xs text-gray-400">
              {realTimeStatus === 'connected' ? 'Live' :
               realTimeStatus === 'connecting' ? 'Connecting...' :
               'Offline'}
            </span>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading || actionLoading}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-gray-300 rounded-lg transition border border-slate-700"
          >
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg transition"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-slate-900/40 border-r border-slate-800 p-4 space-y-1">
          {[
            { id: 'overview', label: 'Live Statistics' },
            { id: 'contacts', label: 'Inquiries & Leads' },
            { id: 'users', label: 'Admin Accounts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Connecting and computing live database statistics...
            </div>
          ) : (
            <>
              {/* TAB 1: Real Dynamic Overview */}
              {activeTab === 'overview' && stats && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Database Metrics</h2>
                    <p className="text-gray-400 text-sm mt-1">Real-time aggregation from PostgreSQL/Prisma</p>
                  </div>

                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-gray-400">Total Submissions</span>
                      <p className="text-3xl font-extrabold text-white mt-2">{stats.totalInquiries || 0}</p>
                      <p className="text-xs text-cyan-400 mt-1">100% Verified DB Records</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-rose-400">Pending Action</span>
                      <p className="text-3xl font-extrabold text-rose-400 mt-2">{stats.pendingInquiries || 0}</p>
                      <p className="text-xs text-gray-500 mt-1">Awaiting initial review</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-amber-400">In Review / Contacted</span>
                      <p className="text-3xl font-extrabold text-amber-300 mt-2">{(stats.inReview || 0) + (stats.contacted || 0)}</p>
                      <p className="text-xs text-gray-500 mt-1">Active client dialogues</p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-emerald-400">Completed Leads</span>
                      <p className="text-3xl font-extrabold text-emerald-400 mt-2">{stats.completed || 0}</p>
                      <p className="text-xs text-gray-500 mt-1">Successfully resolved</p>
                    </div>
                  </div>

                  {/* Services Breakdown Table */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Inquiries by Service Category</h3>
                    {(!stats?.servicesBreakdown || stats.servicesBreakdown.length === 0) ? (
                      <p className="text-gray-500 text-sm">No service-categorized records found in database.</p>
                    ) : (
                      <div className="space-y-3">
                        {(stats.servicesBreakdown || []).map((item, idx) => {
                          const percentage = stats.totalInquiries > 0
                            ? Math.round((item.count / stats.totalInquiries) * 100)
                            : 0;
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300 font-medium">{item.service}</span>
                                <span className="text-gray-400">{item.count} leads ({percentage}%)</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: Contacts List with Dynamic Status Mutator */}
              {activeTab === 'contacts' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">Inbound Inquiries</h2>
                      <p className="text-gray-400 text-sm mt-1">Manage pipeline and status progression</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-4">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="all">All Inquiries</option>
                        <option value="pending">Pending</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 w-48"
                      />
                    </div>
                    <button
                      onClick={handleExportContacts}
                      disabled={exportLoading || filteredContacts.length === 0}
                      className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {exportLoading ? 'Exporting...' : 'Export CSV'}
                    </button>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    {(!filteredContacts || filteredContacts.length === 0) ? (
                      <div className="p-8 text-center text-gray-500 text-sm">
                        No inquiry records matching this criteria.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                          <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
                            <tr>
                              <th className="p-4">Contact</th>
                              <th className="p-4">Service</th>
                              <th className="p-4">Message</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {filteredContacts.map((c) => (
                              <tr key={c.id} className="hover:bg-slate-800/40 transition">
                                <td className="p-4">
                                  <div className="font-semibold text-white">{c.name}</div>
                                  <div className="text-xs text-gray-400">{c.email}</div>
                                  {c.phone && <div className="text-xs text-gray-500">{c.phone}</div>}
                                </td>
                                <td className="p-4">
                                  <span className="text-xs font-mono text-cyan-400">{c.service}</span>
                                </td>
                                <td className="p-4 max-w-sm">
                                  <p className="text-xs text-gray-300 line-clamp-2">{c.message}</p>
                                  <span className="text-[10px] text-gray-500 mt-1 block">
                                    {new Date(c.created_at).toLocaleDateString()}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <select
                                    value={c.status}
                                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                    className={`text-xs border px-2.5 py-1 rounded-lg focus:outline-none bg-slate-950 font-medium ${getStatusBadge(c.status)}`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="in_review">In Review</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="completed">Completed</option>
                                  </select>
                                </td>
                                <td className="p-4 text-right">
                                  <button
                                    onClick={() => handleDeleteContact(c.id)}
                                    className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Registered Admins */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Admin Accounts</h2>
                    <p className="text-gray-400 text-sm mt-1">Verified administrators registered in the system</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left text-sm text-gray-300">
                      <thead className="bg-slate-800/80 text-gray-400 uppercase text-xs">
                        <tr>
                          <th className="p-4">ID</th>
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Created At</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {(adminUsers || []).map((user) => (
                          <tr key={user.id} className="hover:bg-slate-800/40">
                            <td className="p-4 font-mono text-xs text-gray-500">#{user.id}</td>
                            <td className="p-4 font-medium text-white">{user.name}</td>
                            <td className="p-4 text-gray-400">{user.email}</td>
                            <td className="p-4">
                              <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-md font-mono">
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4 text-xs text-gray-500">
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-xs text-rose-400 hover:text-rose-300 font-medium hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;