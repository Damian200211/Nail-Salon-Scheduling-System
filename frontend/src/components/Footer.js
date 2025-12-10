import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-left">
          <strong>Signature Nail Salon</strong>
          <div>123 Main St, Your City</div>
          <div>Open Tue–Sat, 9:30am–7:30pm</div>
        </div>

        <div className="footer-right">
          <div>Phone: (555) 555-5555</div>
          <div>Email: hello@signature-nails.example</div>
          <div className="footer-credit">© {new Date().getFullYear()} Signature Nail Salon</div>
        </div>
      </div>
    </footer>
  );
}
