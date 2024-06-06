import { NavLink, Outlet } from "react-router-dom"
import React, { useEffect, useState } from 'react';

const RootLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };
    return(
        <div className="root-layout">
            <header>
            <nav>
                <h1 className='Nav'>Menu</h1>
                <NavLink to="/">Home</NavLink>
                {isLoggedIn ? ( <button onClick={handleLogout}>Logout</button>): <NavLink to="/login">Login</NavLink>}
               
                
             </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
     )
}
export default RootLayout;