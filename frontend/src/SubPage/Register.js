import "../App.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
        

        window.location.href = '/login';
      } catch (error) {
        setMessage('Error registering user');
      }
    };
  
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login</label>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default Register;