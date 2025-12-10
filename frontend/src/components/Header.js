import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="brand">
          <Link to="/" className="brand-link" onClick={() => setOpen(false)}>
            <span className="logo-mark">S</span>
            <span className="brand-name">Signature Nail Salon</span>
          </Link>
        </div>

        <nav className={`top-nav ${open ? 'open' : ''}`}>
          <Link to="/" className="nav-link small" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" className="nav-link small" onClick={() => setOpen(false)}>About Us</Link>
          <Link to="/services" className="nav-link small" onClick={() => setOpen(false)}>Services</Link>
          <Link to="/gallery" className="nav-link small" onClick={() => setOpen(false)}>Gallery</Link>
          <Link to="/booking" className="nav-link btn-book" onClick={() => setOpen(false)}>Booking</Link>
        </nav>

        <button className={`mobile-menu-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <span className="hamburger" />
        </button>
      </div>
    </header>
  );
}
