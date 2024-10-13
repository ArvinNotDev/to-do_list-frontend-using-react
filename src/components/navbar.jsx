import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/login" className="navbar-link">
          login
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/" className="navbar-link">to-do_list</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
