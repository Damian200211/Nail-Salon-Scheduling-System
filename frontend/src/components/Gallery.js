import React from 'react';

const images = [
  '/images/gallery1.svg',
  '/images/gallery2.svg',
  '/images/gallery3.svg',
  '/images/gallery4.svg',
  '/images/gallery5.svg',
  '/images/gallery6.svg',
  '/images/gallery7.svg',
  '/images/gallery8.svg',
];

export default function Gallery(){
  return (
    <div style={{maxWidth:1200, margin:'30px auto', padding:'20px'}}>
      <h2>Gallery</h2>
      <p style={{color:'var(--muted)'}}>A selection of our recent work.</p>

      <div className="gallery-grid">
        {images.map((src, idx) => (
          <div key={idx} className="gallery-item">
            <img src={src} alt={`Gallery ${idx+1}`} className="gallery-img" />
          </div>
        ))}
      </div>
    </div>
  )
}
