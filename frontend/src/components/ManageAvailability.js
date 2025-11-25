import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

function ManageAvailability({ token, onBlockSuccess }) {
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:30');
  const [endTime, setEndTime] = useState('19:30');
  const [reason, setReason] = useState('Day Off');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch existing time blocks
  const fetchTimeBlocks = () => {
    if (token) {
      axios.get(`${API_URL}/timeblocks/`, {
        headers: { 'Authorization': `Token ${token}` }
      })
      .then(res => setTimeBlocks(res.data))
      .catch(err => console.error("Error fetching time blocks", err));
    }
  };
  
  useEffect(() => {
    fetchTimeBlocks();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const blockData = {
      date: date,
      start_time: startTime,
      end_time: endTime,
      reason: reason
    };

    axios.post(`${API_URL}/timeblocks/`, blockData, {
      headers: { 'Authorization': `Token ${token}` }
    })
    .then(res => {
      setMessage("Time block created successfully!");
      fetchTimeBlocks(); // Refresh the list
      onBlockSuccess(); // Tell dashboard to refresh appts (as availability changed)
    })
    .catch(err => {
      console.error("Error creating time block", err);
      setError("Failed to create time block.");
    });
  };

  const deleteBlock = (id) => {
    if (window.confirm("Are you sure you want to delete this time block?")) {
      axios.delete(`${API_URL}/timeblocks/${id}/`, {
        headers: { 'Authorization': `Token ${token}` }
      })
      .then(() => {
        setMessage("Time block deleted.");
        fetchTimeBlocks(); // Refresh list
        onBlockSuccess(); // Refresh appts
      })
      .catch(err => {
        console.error("Error deleting time block", err);
        setError("Failed to delete time block.");
      });
    }
  };

  return (
    <div className="form-container">
      <h3>Manage Time Off</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.g.value)} required />
        </div>
        <div className="form-group">
          <label>Start Time (e.g., 09:30)</label>
          <input type="time" value={startTime} onChange={e => setStartTime(e.g.value)} required />
        </div>
        <div className="form-group">
          <label>End Time (e.g., 17:00)</label>
          <input type="time" value={endTime} onChange={e => setEndTime(e.g.value)} required />
        </div>
        <div className="form-group">
          <label>Reason (Optional)</label>
          <input type="text" value={reason} onChange={e => setReason(e.g.value)} />
        </div>
        <button type="submit" className="btn-secondary" style={{width: '100%'}}>Block Out Time</button>
        {message && <p className="message success-message">{message}</p>}
        {error && <p className="message error-message">{error}</p>}
      </form>

      <h4 style={{marginTop: '30px'}}>Existing Time Blocks</h4>
      <ul className="time-block-list">
        {timeBlocks.length === 0 && <p>No time blocks found.</p>}
        {timeBlocks.map(block => (
          <li key={block.id} className="time-block-item">
            <div>
              <strong>{block.date}</strong><br />
              {block.start_time} - {block.end_time}
              {block.reason && ` (${block.reason})`}
            </div>
            <button onClick={() => deleteBlock(block.id)} className="btn-danger">Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageAvailability;
