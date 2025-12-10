import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export default function AboutUs(){
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    axios.get(`${API_URL}/technicians/`)
      .then(res => { if (mounted) setTechnicians(res.data || []); })
      .catch(() => { if (mounted) setError('Could not load team information.'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <h1>About Signature Nail Salon</h1>
            <p className="lead">A boutique nail studio focused on clean, beautiful, and healthy nails — served with warm hospitality.</p>
            <p className="muted">Located in Fort Worth, TX, our team offers manicure, pedicure, and advanced nail art services using premium products and strict sanitation protocols.</p>
            <div className="about-ctas">
              <Link className="btn-primary" to="/booking">Book an Appointment</Link>
              <a className="btn-secondary" href="tel:+15555555555">Call Us</a>
            </div>
          </div>
          <div className="about-hero-image" aria-hidden="true"></div>
        </div>
      </section>

      <section className="about-content">
        <div className="container" style={{maxWidth:1100}}>
          <div className="split">
            <div>
              <h2>Our Mission</h2>
              <p className="muted">To provide a calming, professional salon experience where artistry and hygiene meet. We prioritize client comfort, ongoing technician training, and high-quality products.</p>

              <h3>What We Offer</h3>
              <ul className="tick-list muted">
                <li>Classic manicures & pedicures</li>
                <li>Gel & dip powder systems</li>
                <li>Custom nail art & extensions</li>
                <li>Sanitation-first procedures</li>
              </ul>
            </div>

            <aside>
              <h3>Visit Us</h3>
              <p className="muted">123 Main St, Fort Worth, TX</p>
              <p className="muted">Open Tue–Sun • 9:30am – 7:00pm</p>
              <p><a className="btn-secondary" href="https://www.google.com/maps/search/?api=1&query=123+Main+St+Fort+Worth+TX" target="_blank" rel="noopener noreferrer">Directions</a></p>
            </aside>
          </div>

          <h3 style={{marginTop:36}}>Meet Our Team</h3>
          {loading ? (
            <p className="muted">Loading team…</p>
          ) : error ? (
            <p className="muted">{error}</p>
          ) : (
            <div className="team-grid">
              {technicians.length === 0 && <p className="muted">No technicians found.</p>}
              {technicians.map((tech) => (
                <div className="team-card" key={tech.id}>
                  <div className="team-photo" aria-hidden="true">{tech.name ? tech.name[0] : 'T'}</div>
                  <div className="team-info">
                    <strong>{tech.name}</strong>
                    <div className="muted small">Technician</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
