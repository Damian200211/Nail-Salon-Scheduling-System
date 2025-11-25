import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PublicBookingPage from './components/PublicBookingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import './index.css'; // Make sure to import your CSS

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <h1><Link to="/" className="nav-link">Signature Nail Salon</Link></h1>
          <Link to="/admin" className="nav-link">Technician Login</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<PublicBookingPage />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Default admin route redirects to login */}
          <Route path="/admin" element={<Login />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;