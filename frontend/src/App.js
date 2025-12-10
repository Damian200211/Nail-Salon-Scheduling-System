import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicBookingPage from './components/PublicBookingPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'; // Make sure to import your CSS

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<PublicBookingPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* Default admin route redirects to login */}
            <Route path="/admin" element={<Login />} /> 
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;