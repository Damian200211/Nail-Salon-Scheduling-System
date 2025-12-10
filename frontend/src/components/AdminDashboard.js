import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminBookingForm from './AdminBookingForm';
import ManageAvailability from './ManageAvailability';

const API_URL = 'http://127.0.0.1:8000/api';

function AdminDashboard() {
  const [token, setToken] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      fetchAppointments(savedToken);
    } else {
      // If no token, redirect to login
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchAppointments = (authToken) => {
    setLoading(true);
    axios.get(`${API_URL}/appointments/`, {
      headers: { 'Authorization': `Token ${authToken}` }
    })
    .then(res => {
      setAppointments(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching appointments", err);
      setLoading(false);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        handleLogout(); // Token is invalid or expired
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  // Callback to refresh data after a new booking or time block
  const handleDataChanged = () => {
    fetchAppointments(token);
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2>Technician Dashboard</h2>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </div>
      
      <div className="dashboard-container">
        <div className="dashboard-column">
          <AdminBookingForm token={token} onBookingSuccess={handleDataChanged} />
          <ManageAvailability token={token} onBlockSuccess={handleDataChanged} />
        </div>

        <div className="dashboard-column">
          <div className="form-container">
            <h3>My Upcoming Appointments</h3>
            {loading ? (
              <p>Loading appointments...</p>
            ) : (
              <ul className="appointment-list">
                {appointments.length === 0 ? (
                  <p>You have no upcoming appointments.</p>
                ) : (
                  appointments.map(app => (
                    <li key={app.id} className="appointment-item">
                      <div className="appointment-item-details">
                        <strong>{new Date(app.start_time).toLocaleString()}</strong>
                        {app.customer_first_name} {app.customer_last_name}
                        <br />
                        {app.customer_email}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;