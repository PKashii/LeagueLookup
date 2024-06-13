import { NavLink, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import axios from 'axios'

const RootLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/current-user', {
              headers: { 'Authorization': token }
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
    return(
        <div className="root-layout">
            <header>
            <nav>
                <h1 className='Nav'>Menu</h1>            
                <NavLink to="/">Home</NavLink>
                {isLoggedIn ? (<NavLink to="/favoritues">Favoritues</NavLink>) :(<div></div>)}
                {isLoggedIn ? ( <button onClick={handleLogout}>Logout</button>  ): <NavLink to="/login">Login</NavLink>}
                
               
                
             </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
     )
}
export default RootLayout;