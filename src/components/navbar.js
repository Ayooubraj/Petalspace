// Navbar.js
import React from 'react';
import './navbar.css';
import logo from '../assets/images/logo1.png';
function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
            <img src={logo} alt="Petalspace Logo" className="logo" />
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Shop</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    

                    
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
