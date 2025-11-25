import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

// API base URL
const API_URL = 'http://127.0.0.1:8000/api';

function PublicBookingPage() {
  const [categories, setCategories] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  
  const [customerForm, setCustomerForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch initial data (Categories/Services and Technicians)
  useEffect(() => {
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
  }, []);

  // Fetch availability when dependencies change
  useEffect(() => {
    // Only fetch if we have all the info needed
    if (selectedTechnician && selectedDate && selectedServices.length > 0) {
      fetchAvailability();
    }
  }, [selectedTechnician, selectedDate, selectedServices]);

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

  const fetchAvailability = () => {
    const data = {
      technician_id: selectedTechnician,
      service_ids: selectedServices,
      date: selectedDate.toISOString().split('T')[0] // 'YYYY-MM-DD'
    };
    
    axios.post(`${API_URL}/availability/`, data)
      .then(res => {
        setAvailableSlots(res.data);
        setSelectedSlot(''); // Reset slot selection
      })
      .catch(err => {
        console.error("Error fetching availability", err);
        setError("Could not fetch availability for this day.");
        setAvailableSlots([]); // Clear slots on error
      });
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!selectedSlot) {
      setError("Please select a time slot.");
      return;
    }

    const [hour, minute] = selectedSlot.split(':');
    const bookingStartTime = new Date(selectedDate);
    bookingStartTime.setHours(hour, minute, 0, 0);

    const bookingData = {
      technician: selectedTechnician,
      services: selectedServices,
      start_time: bookingStartTime.toISOString(),
      customer_first_name: customerForm.first_name,
      customer_last_name: customerForm.last_name,
      customer_email: customerForm.email,
    };

    axios.post(`${API_URL}/appointments/`, bookingData)
      .then(res => {
        setMessage("Appointment booked successfully! A confirmation email has been sent.");
        // Clear form
        setSelectedServices([]);
        setSelectedTechnician('');
        setSelectedSlot('');
        setAvailableSlots([]);
        setCustomerForm({ first_name: '', last_name: '', email: '' });
      })
      .catch(err => {
        console.error("Error booking appointment", err);
        setError("Failed to book appointment. Please try again.");
      });
  };

  return (
    <div className="booking-page-container">
      <div className="booking-column">
        <h3>1. Select Services</h3>
        <ul className="service-list">
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
                  <span className="price">${parseFloat(service.price).toFixed(2)}{service.price_note || ''}</span>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>

      <div className="booking-column">
        <h3>2. Select Technician & Date</h3>
        <div className="form-group">
          <label>Technician</label>
          <select value={selectedTechnician} onChange={e => setSelectedTechnician(e.target.value)} required>
            <option value="">Select a Technician</option>
            {technicians.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
        </div>
        
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          minDate={new Date()} // Can't book in the past
        />

        {selectedTechnician && selectedServices.length > 0 && (
          <div className="time-slots-container">
            <h3>3. Select Time</h3>
            {availableSlots.length > 0 ? (
              <div className="time-slots-grid">
                {availableSlots.map(slot => (
                  <div 
                    key={slot}
                    className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {/* Format H:M to AM/PM */}
                    {new Date(`1970-01-01T${slot}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                ))}
              </div>
            ) : (
              <p>No available slots for this technician on this day.</p>
            )}
          </div>
        )}

        {selectedSlot && (
          <form className="form-container" onSubmit={handleSubmitBooking} style={{marginTop: '20px'}}>
            <h3>4. Your Information</h3>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="first_name" value={customerForm.first_name} onChange={handleCustomerFormChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="last_name" value={customerForm.last_name} onChange={handleCustomerFormChange} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={customerForm.email} onChange={handleCustomerFormChange} required />
            </div>
            <button type="submit" className="btn-primary" style={{width: '100%'}}>Book Appointment</button>
            {message && <p className="message success-message">{message}</p>}
            {error && <p className="message error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default PublicBookingPage;