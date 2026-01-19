import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash, ExternalLink } from 'lucide-react';

export default function Jobs() {
  const { api } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    company: '', position: '', status: 'applied', date_applied: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs/list/');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs/list/', formData);
      setShowForm(false);
      fetchJobs();
      setFormData({ company: '', position: '', status: 'applied', date_applied: new Date().toISOString().split('T')[0] });
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : "Failed to create job";
      alert(errorMsg);
    }
  };

  const handleDelete = async (id) => {
    if(!confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/list/${id}/`);
      fetchJobs();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'text-blue-400',
      interviewing: 'text-yellow-400',
      offer: 'text-green-400',
      rejected: 'text-red-400',
      accepted: 'text-green-500'
    };
    return colors[status] || 'text-white';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Job Applications</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <Plus size={20} style={{ marginRight: '8px' }} /> Add Job
        </button>
      </div>

      {showForm && (
        <div className="glass-card animate-fade" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label>Company</label>
              <input required value={formData.company} onChange={e=>setFormData({...formData, company: e.target.value})} className="input-field" style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }} />
            </div>
            <div>
              <label>Position</label>
              <input required value={formData.position} onChange={e=>setFormData({...formData, position: e.target.value})} style={{ width: '100%', padding: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }} />
            </div>
            <div>
              <label>Status</label>
              <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'white' }}>
                <option value="applied">Applied</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {jobs.map(job => (
            <div key={job.id} className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{job.position}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{job.company}</p>
                </div>
                <span style={{ fontSize: '0.9rem', textTransform: 'capitalize', padding: '0.25rem 0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.1)' }}>{job.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>{job.date_applied}</span>
                <button onClick={() => handleDelete(job.id)} style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}><Trash size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
