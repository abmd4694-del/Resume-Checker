import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function Resume() {
  const { api } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await api.post('/resume/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data ? JSON.stringify(err.response.data) : "Resume Analysis Failed";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Resume Analysis</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Upload Section */}
        <div className="glass-card">
          <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <Upload size={24} style={{ marginRight: '10px' }} /> Upload Resume
          </h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ border: '2px dashed var(--glass-border)', padding: '2rem', textAlign: 'center', borderRadius: '1rem', cursor: 'pointer' }}
                 onClick={() => document.getElementById('fileInput').click()}>
              <FileText size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }} />
              <p>{file ? file.name : "Click to select PDF"}</p>
              <input 
                id="fileInput" 
                type="file" 
                accept=".pdf" 
                hidden 
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </div>
            <button disabled={loading} className="btn btn-primary">
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="glass-card animate-fade">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Analysis Result</h2>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: result.ats_score > 70 ? '#4ade80' : '#facc15' }}>
                  Score: {result.ats_score}/100
                </span>
             </div>
             
             <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Detected Skills</h3>
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
               {result.skills_detected?.map((skill, i) => (
                 <span key={i} style={{ background: 'hsl(var(--primary) / 0.2)', color: 'hsl(var(--primary))', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.9rem' }}>
                   {skill}
                 </span>
               ))}
               {(!result.skills_detected || result.skills_detected.length === 0) && <p style={{ color: 'var(--text-secondary)' }}>No skills detected.</p>}
             </div>
             
             <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Parsed Text Preview</h3>
             <div style={{ maxHeight: '200px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {result.extracted_text?.substring(0, 500)}...
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
