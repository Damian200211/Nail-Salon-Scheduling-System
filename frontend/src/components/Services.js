import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export default function Services(){
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    // fetch categories and services and group them similar to booking page logic
    axios.get(`${API_URL}/categories/`)
      .then(catRes => {
        axios.get(`${API_URL}/services/`)
          .then(serviceRes => {
            if (!mounted) return;
            const services = serviceRes.data || [];
            const cats = catRes.data.map(category => ({
              ...category,
              services: services.filter(s => s.category === category.id)
            }));
            setCategories(cats);
          })
          .catch(() => { if (mounted) setCategories([]); });
      })
      .catch(() => { if (mounted) setError('Could not load services.'); })
      .finally(() => { if (mounted) setLoading(false); });

    return () => { mounted = false; };
  }, []);

  if (loading) return <div style={{maxWidth:1100, margin:'30px auto', padding:'20px'}}><p className="muted">Loading services…</p></div>;
  if (error) return <div style={{maxWidth:1100, margin:'30px auto', padding:'20px'}}><p className="muted">{error}</p></div>;

  return (
    <div style={{maxWidth:1100, margin:'30px auto', padding:'20px'}}>
      <h2>Services</h2>
      <p className="muted">Choose from our curated menu of treatments. Click booking to schedule.</p>

      {categories.map(cat => (
        <section key={cat.id} style={{marginTop:18}}>
          <h3>{cat.name}</h3>
          <div>
            {cat.services.length === 0 && <p className="muted">No services listed for this category.</p>}
            {cat.services.map(s => (
              <div key={s.id} className="service-item">
                <label style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                  <span>{s.name}</span>
                  <strong>${parseFloat(s.price).toFixed(2)}</strong>
                </label>
                <div style={{fontSize:'.92rem', color:'var(--muted)'}}>{s.duration_minutes} minutes</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
