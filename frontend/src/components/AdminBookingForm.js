import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function AdminBookingForm({ token, onBookingSuccess }) {
  const [categories, setCategories] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  
  const [customerForm, setCustomerForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch categories and technicians on load
  useEffect(() => {
    if (token) {
      // Fetch categories first
      axios.get(`${API_URL}/categories/`)
        .then(res => {
            // Now fetch all services
            axios.get(`${API_URL}/services/`)
                .then(serviceRes => {
                    const services = serviceRes.data;
                    // Group services under their categories
                    const cats = res.data.map(category => {
                        return {
                            ...category,
                            services: services.filter(s => s.category === category.id)
                        }
                    });
                    setCategories(cats);
                })
        })
        .catch(err => console.error("Error fetching categories", err));
        
      // Fetch technicians
      axios.get(`${API_URL}/technicians/`)
        .then(res => setTechnicians(res.data))
        .catch(err => console.error("Error fetching technicians", err));
    }
  }, [token]);

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    if (e.target.checked) {
      setSelectedServices(prev => [...prev, serviceId]);
    } else {
      setSelectedServices(prev => prev.filter(id => id !== serviceId));
    }
  };

  const handleCustomerFormChange = (e) => {
    setCustomerForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const bookingStartTime = new Date(`${date}T${time}:00`);

    const bookingData = {
      technician: selectedTechnician,
      services: selectedServices,
      start_time: bookingStartTime.toISOString(),
      customer_first_name: customerForm.first_name,
      customer_last_name: customerForm.last_name,
      customer_email: customerForm.email,
    };

    // Use the token to create the appointment
    axios.post(`${API_URL}/appointments/`, bookingData, {
      headers: { 'Authorization': `Token ${token}` }
    })
    .then(res => {
      setMessage("Appointment created successfully!");
      onBookingSuccess(); // Tell the dashboard to refresh
      // Clear form
      setSelectedServices([]);
      setSelectedTechnician('');
      setDate(new Date().toISOString().split('T')[0]);
      setTime('');
      setCustomerForm({ first_name: '', last_name: '', email: '' });
    })
    .catch(err => {
      console.error("Error creating appointment", err);
      setError("Failed to create appointment. Check availability.");
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Create Manual (Call-In) Appointment</h3>
      
      <div className="form-group">
        <label>Customer First Name</label>
        <input type="text" name="first_name" value={customerForm.first_name} onChange={handleCustomerFormChange} required />
      </div>
      <div className="form-group">
        <label>Customer Last Name</label>
        <input type="text" name="last_name" value={customerForm.last_name} onChange={handleCustomerFormChange} required />
      </div>
      <div className="form-group">
        <label>Customer Email</label>
        <input type="email" name="email" value={customerForm.email} onChange={handleCustomerFormChange} required />
      </div>

      <div className="form-group">
        <label>Technician</label>
        <select value={selectedTechnician} onChange={e => setSelectedTechnician(e.target.value)} required>
          <option value="">Select a Technician</option>
          {technicians.map(tech => (
            <option key={tech.id} value={tech.id}>{tech.name}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Time (e.g., 13:30)</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      </div>

      <div className="form-group">
        <label>Services</label>
        <div className="service-list" style={{maxHeight: '200px'}}>
          {categories.map(category => (
            <li key={category.id} className="service-category">
              <h4>{category.name}</h4>
              {category.services.map(service => (
                <div key={service.id} className="service-item">
                  <label>
                    <input 
                      type="checkbox" 
                      value={service.id} 
                      onChange={handleServiceChange}
                      checked={selectedServices.includes(String(service.id))}
                    />
                    {service.name}
                  </label>
                </div>
              ))}
            </li>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary" style={{width: '100%'}}>Create Appointment</button>
      {message && <p className="message success-message">{message}</p>}
      {error && <p className="message error-message">{error}</p>}
    </form>
  );
}

export default AdminBookingForm;