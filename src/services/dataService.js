import supabase from '../lib/supabaseClient';

export async function submitContactForm({ name, email, phone, company, subject, service, message }) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      name: String(name || '').trim().slice(0, 120),
      email: String(email || '').trim().toLowerCase().slice(0, 180),
      phone: phone ? String(phone).trim().slice(0, 40) : '',
      company: company ? String(company).trim().slice(0, 120) : '',
      subject: subject ? String(subject).trim().slice(0, 180) : '',
      service: service ? String(service).trim().slice(0, 80) : 'General Inquiry',
      message: String(message || '').trim().slice(0, 4000)
    }])
    .select('id, created_at')
    .single();

  if (error) throw new Error(error.message || 'Failed to submit contact form');
  return { success: true, message: 'Message received', contact: data };
}

export async function getContacts(statusFilter) {
  let query = supabase.from('contacts').select('*').order('created_at', { ascending: false });
  if (statusFilter && statusFilter !== 'all') {
    query = query.eq('status', statusFilter);
  }
  const { data, error } = await query;
  if (error) throw new Error(error.message || 'Failed to fetch contacts');
  return data;
}

export async function updateContactStatus(id, status, notes) {
  const updates = {};
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes;
  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw new Error(error.message || 'Failed to update contact');
  return data;
}

export async function deleteContact(id) {
  const { error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) throw new Error(error.message || 'Failed to delete contact');
  return true;
}

export async function getOverviewStats() {
  const [contactsRes, pageViewsRes, sessionsRes, newLeadsRes, todayViewsRes, todayLeadsRes] = await Promise.all([
    supabase.from('contacts').select('*', { count: 'exact', head: true }),
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('sessions').select('*', { count: 'exact', head: true }),
    supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', new Date().toISOString().split('T')[0]),
    supabase.from('contacts').select('*', { count: 'exact', head: true }).gte('created_at', new Date().toISOString().split('T')[0])
  ]);

  return {
    contacts: contactsRes.count || 0,
    pageViews: pageViewsRes.count || 0,
    sessions: sessionsRes.count || 0,
    newLeads: newLeadsRes.count || 0,
    todayViews: todayViewsRes.count || 0,
    todayLeads: todayLeadsRes.count || 0
  };
}

export async function getLiveVisitors() {
  const ninetySecondsAgo = new Date(Date.now() - 90_000).toISOString();
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .gte('last_seen', ninetySecondsAgo)
    .order('last_seen', { ascending: false });
  if (error) throw new Error(error.message || 'Failed to fetch live visitors');
  return data;
}

export async function getDeviceBreakdown() {
  const { data, error } = await supabase.rpc('get_device_breakdown');
  if (error) {
    const { data: fallback, error: fallbackErr } = await supabase
      .from('sessions')
      .select('device');
    if (fallbackErr) return [];
    const map = {};
    (fallback || []).forEach((row) => {
      const d = row.device || 'unknown';
      map[d] = (map[d] || 0) + 1;
    });
    return Object.entries(map).map(([device, count]) => ({ device, count }));
  }
  return data || [];
}

export async function getCountryBreakdown() {
  const { data, error } = await supabase
    .from('sessions')
    .select('country, region')
    .not('country', 'eq', 'Unknown');
  if (error) return [];
  const map = {};
  (data || []).forEach((row) => {
    const key = `${row.country}|${row.region || ''}`;
    map[key] = (map[key] || 0) + 1;
  });
  return Object.entries(map)
    .map(([key, count]) => {
      const [country, region] = key.split('|');
      return { country, region, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);
}
