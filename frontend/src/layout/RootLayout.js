import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Outlet } from 'react-router-dom';
import './RootLayout.css';

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/current-user', {
        headers: { Authorization: token },
      })
        .then(response => {
          setCurrentUser(response.data);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('Error fetching current user:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div className="root-layout">
      <header>
        <nav>
          <NavLink to="/" className="nav-link">Home</NavLink>
          {isLoggedIn && <NavLink to="/favorites" className="nav-link">Favorites</NavLink>}
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="nav-link">Login</NavLink>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
