import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../lib/supabaseClient';
import { getContacts, updateContactStatus, deleteContact, getOverviewStats, getLiveVisitors } from '../services/dataService';

const POLL_INTERVAL = 10000;
const STATUSES = ['new', 'contacted', 'qualified', 'won', 'closed'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [totals, setTotals] = useState({});
  const [liveVisitors, setLiveVisitors] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [realTimeStatus, setRealTimeStatus] = useState('connecting');
  const [searchTerm, setSearchTerm] = useState('');
  const [exportLoading, setExportLoading] = useState(false);
  const [knownLeadCount, setKnownLeadCount] = useState(0);
  const pollRef = useRef(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('aura_admin_token');
    localStorage.removeItem('aura_admin_user');
    navigate('/admin/login');
  };

  const fetchOverview = useCallback(async () => {
    try {
      const [stats, live] = await Promise.all([
        getOverviewStats(),
        getLiveVisitors()
      ]);
      setTotals(stats);
      setLiveVisitors(live);
      const newCount = stats.contacts ?? 0;
      if (newCount > knownLeadCount && knownLeadCount > 0) {
        setRealTimeStatus('live-update');
        setTimeout(() => setRealTimeStatus('connected'), 3000);
      }
      setKnownLeadCount(newCount);
      setRealTimeStatus('connected');
    } catch (err) {
      setRealTimeStatus('disconnected');
    }
  }, [knownLeadCount]);

  const fetchContacts = useCallback(async () => {
    try {
      const data = await getContacts(statusFilter);
      setContacts(data || []);
    } catch (err) {
      setContacts([]);
    }
  }, [statusFilter]);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchOverview(), fetchContacts()]);
    setLoading(false);
  }, [fetchOverview, fetchContacts]);

  useEffect(() => {
    fetchDashboardData();
    pollRef.current = setInterval(() => {
      fetchOverview();
      fetchContacts();
    }, POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [fetchDashboardData, fetchOverview, fetchContacts]);

  const handleStatusChange = async (contactId, newStatus) => {
    setActionLoading(true);
    try {
      await updateContactStatus(contactId, newStatus);
      fetchContacts();
    } catch {
      alert('Failed to update inquiry status.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    setActionLoading(true);
    try {
      await deleteContact(contactId);
      fetchContacts();
      fetchOverview();
    } catch {
      alert('Failed to delete inquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredContacts = (contacts || []).filter((contact) => {
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    if (!matchesStatus) return false;
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(q) ||
      contact.email?.toLowerCase().includes(q) ||
      contact.subject?.toLowerCase().includes(q) ||
      contact.company?.toLowerCase().includes(q) ||
      contact.service?.toLowerCase().includes(q)
    );
  });

  const handleExportContacts = () => {
    setExportLoading(true);
    try {
      const csvContent = [
        ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Subject', 'Status', 'Created At'],
        ...filteredContacts.map((c) => [
          c.id, c.name, c.email, c.phone || '', c.company || '',
          c.service || '', c.subject || '', c.status, c.created_at
        ])
      ].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aura_contacts_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Failed to export contacts.');
    } finally {
      setExportLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'won':
      case 'closed':
        return 'bg-emerald-950/70 text-emerald-400 border-emerald-800';
      case 'contacted':
      case 'qualified':
        return 'bg-cyan-950/70 text-cyan-400 border-cyan-800';
      case 'new':
      default:
        return 'bg-rose-950/70 text-rose-400 border-rose-800';
    }
  };

  const serviceBreakdown = (() => {
    if (!contacts.length) return [];
    const map = {};
    contacts.forEach((c) => {
      const svc = c.service || 'General';
      map[svc] = (map[svc] || 0) + 1;
    });
    return Object.entries(map).map(([service, count]) => ({ service, count }));
  })();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
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
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              realTimeStatus === 'connected' ? 'bg-emerald-400 animate-pulse' :
              realTimeStatus === 'live-update' ? 'bg-yellow-400 animate-pulse' :
              realTimeStatus === 'connecting' ? 'bg-amber-400 animate-pulse' :
              'bg-rose-400'
            }`} />
            <span className="text-xs text-gray-400">
              {realTimeStatus === 'connected' ? 'Live' :
               realTimeStatus === 'live-update' ? 'New lead!' :
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

      <div className="flex-1 flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-slate-900/40 border-r border-slate-800 p-4 space-y-1">
          {[
            { id: 'overview', label: 'Live Statistics' },
            { id: 'contacts', label: 'Inquiries & Leads' }
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

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
              Loading dashboard data...
            </div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Performance Overview</h2>
                    <p className="text-gray-400 text-sm mt-1">Real-time data synced every {POLL_INTERVAL / 1000}s</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-gray-400">Total Leads</span>
                      <p className="text-3xl font-extrabold text-white mt-2">{totals.contacts || 0}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-rose-400">New</span>
                      <p className="text-3xl font-extrabold text-rose-400 mt-2">{totals.newLeads || 0}</p>
                      <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-cyan-400">Today Views</span>
                      <p className="text-3xl font-extrabold text-cyan-400 mt-2">{totals.todayViews || 0}</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                      <span className="text-xs uppercase font-semibold text-emerald-400">Today Leads</span>
                      <p className="text-3xl font-extrabold text-emerald-400 mt-2">{totals.todayLeads || 0}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Inquiries by Service</h3>
                    {serviceBreakdown.length === 0 ? (
                      <p className="text-gray-500 text-sm">No inquiry records yet.</p>
                    ) : (
                      <div className="space-y-3">
                        {serviceBreakdown.map((item) => {
                          const pct = totals.contacts > 0 ? Math.round((item.count / totals.contacts) * 100) : 0;
                          return (
                            <div key={item.service} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-300 font-medium">{item.service}</span>
                                <span className="text-gray-400">{item.count} ({pct}%)</span>
                              </div>
                              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {liveVisitors.length > 0 && (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Live Visitors</h3>
                      <ul className="space-y-2 max-h-48 overflow-auto">
                        {liveVisitors.map((s) => (
                          <li key={s.id} className="text-sm flex justify-between gap-3">
                            <span>{s.country} · {s.device} · {s.browser}</span>
                            <span className="text-gray-400 truncate">{s.landing_page}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

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
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
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
                    {filteredContacts.length === 0 ? (
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
                                    {c.created_at ? new Date(c.created_at).toLocaleDateString() : ''}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <select
                                    value={c.status}
                                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                    className={`text-xs border px-2.5 py-1 rounded-lg focus:outline-none bg-slate-950 font-medium ${getStatusBadge(c.status)}`}
                                  >
                                    {STATUSES.map((s) => (
                                      <option key={s} value={s}>{s}</option>
                                    ))}
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
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
