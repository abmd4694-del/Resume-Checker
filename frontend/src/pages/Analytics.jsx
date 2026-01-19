import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const { api, user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/analytics/dashboard/');
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Process data for charts
  const statusData = data?.status_distribution.map(item => ({
    name: item.status,
    value: item.count
  })) || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];


  // ... (existing data fetching)

  // ...

  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome back!
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Here is what's happening with your job search today.</p>
      </div>
      
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card" style={{ background: 'linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.6) 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
             <h3 style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Total Applications</h3>
             <BarChart3 size={20} color="var(--text-secondary)" />
          </div>
          <p style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: 1 }}>{data?.total_applications}</p>
          <p style={{ fontSize: '0.9rem', color: '#4ade80', marginTop: '0.5rem' }}>+2 this week</p>
        </div>
        <div className="glass-card" style={{ background: 'linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.6) 100%)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
             <h3 style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Weekly Activity</h3>
             <PieIcon size={20} color="var(--text-secondary)" />
           </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <p style={{ fontSize: '3rem', fontWeight: 'bold', color: 'hsl(var(--primary))', lineHeight: 1 }}>{data?.weekly_applications}</p>
            <span style={{ color: 'var(--text-secondary)' }}>applications</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Status Chart */}
        <div className="glass-card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Application Status</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Placeholder for More Charts */}
        <div className="glass-card" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <BarChart3 size={48} style={{ marginBottom: '1rem' }} />
            <p>More insights coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
