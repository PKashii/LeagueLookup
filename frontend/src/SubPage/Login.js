import "../App.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
          const response = await axios.post('http://localhost:5000/api/login', { login, password });
          const token = response.data.token;

          
          localStorage.setItem('token', token);

          setMessage('Logged in successfully!');
          setIsLoggedIn(true);

          window.location.href = '/';
      } catch (error) {
          setMessage('Invalid username or password');
          setIsLoggedIn(false);
      }
  };
  const item = localStorage.getItem('token');
  return (
      
      <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
              <div>
                  <label>Login</label>
                  <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
              </div>
              <div>
                  <label>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          {isLoggedIn && <p>Wait!</p>}
      </div>
  );
};

export default Login;