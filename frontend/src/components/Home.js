import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero hero--large">
        <div className="hero-inner">
          <div className="hero-flex">
            <div className="hero-content">
              <h1 className="hero-title">Signature Nail Salon</h1>
              <p className="hero-sub">Nails Salon Fort Worth, TX • Pedicure & Manicure</p>
              <p className="hero-paragraph">Welcome to Signature Nail Salon — a calm and luxurious retreat. Book your appointment with our talented technicians for a relaxing, beautiful experience.</p>
              <div className="hero-ctas">
                <Link className="btn-primary" to="/booking">Booking</Link>
                <a className="btn-secondary" href="tel:+15555555555">Call us now</a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-blob" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery-preview">
            <div style={{maxWidth:1200, margin:'0 auto', padding:'20px'}}>
              <h3>Our Gallery</h3>
              <p style={{color:'var(--muted)'}}>Explore our stunning nail design collection for unique, inspiring looks.</p>

              <div className="gallery-grid" style={{marginTop:12}}>
                {['/images/gallery1.svg','/images/gallery2.svg','/images/gallery3.svg','/images/gallery1.svg'].map((src, i) => (
                  <div key={i} className="gallery-item">
                    <img src={src} alt={`Gallery ${i+1}`} className="gallery-img" />
                  </div>
                ))}
              </div>

              <p style={{marginTop:12}}><Link className="btn-primary" to="/gallery">See the full gallery</Link></p>
            </div>
      </section>
    </main>
  );
}
