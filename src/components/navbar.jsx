import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loginIcon from '../assets/images/door-open-fill.svg';
import userIcon from '../assets/images/user.svg';
import './navbar.css';
import useCheckLogin from './checkLogin';

const Navbar = () => {
  const isLogin = useCheckLogin(); // Call the hook directly

  const handleLogout = () => {
    localStorage.removeItem('access');
    window.location.reload()
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div>
          {isLogin ? (
            <>
              <Link className='navbar-link'>
                <img src={userIcon} alt="profile" width={50} />
              </Link>
              <Link onClick={handleLogout} className='navbar-link'>
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login" className="navbar-link">
              <img src={loginIcon} alt="login" />
              Login
            </Link>
          )}
        </div>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/to-do_list" className="navbar-link">To-Do List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
