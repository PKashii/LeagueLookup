import "../App.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = '/';
    }
}, []);
  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post('http://localhost:5000/login', { login, password });
          const token = response.data.token;

          
          localStorage.setItem('token', token);

          
          setMessage('Logged in successfully!');
          setIsLoggedIn(true);

          setTimeout(() => {
            window.location.href = '/';;
          }, 3000);

          
      } catch (error) {
          setMessage('Invalid username or password');
          setIsLoggedIn(false);
      }
  };

  return (
    <div>
      <div className="app">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Login</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
          
          <button type="submit">Login</button>
        </form>
      </div>
      {message && (
        <p style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          {message}
        </p>
      )}
      {isLoggedIn}
      
    </div>
  );
};

export default Login;
