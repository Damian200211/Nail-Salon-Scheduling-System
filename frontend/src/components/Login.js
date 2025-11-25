import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://127.0.0.1:8000/api/login/', { username, password })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('authToken', token); // Save token
        navigate('/admin/dashboard'); // Redirect to dashboard
      })
      .catch(err => {
        console.error("Login failed", err);
        setError('Invalid username or password.');
      });
  };

  return (
    <div className="login-container">
      <h2>Technician Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
        {error && <p className="message error-message">{error}</p>}
      </form>
    </div>
  );
}

export default Login;