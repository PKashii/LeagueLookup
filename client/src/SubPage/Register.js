import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { login, password });
      setMessage('User registered successfully!');

      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);

    } catch (error) {
      setMessage('Error registering user');
    }
  };

  return (
    <div>
      <div className="app">
        <h1>Register</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
          <button type="submit">Register</button>
        </form>
      </div>
      {message && (
        <p style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
