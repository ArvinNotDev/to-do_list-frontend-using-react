import React, { useEffect, useState } from 'react';
import './login.css';
import CheckLogin from './checkLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginSignup, setLoginSignup] = useState(true);

  useEffect(() => {
    document.getElementById("header").textContent = loginSignup ? "Login" : "Sign Up";
  }, [loginSignup]);

  const swapLoginMethod = () => setLoginSignup(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const result = await response.json();
      localStorage.setItem('access', result.access);

      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      window.location.href = "/"
    } catch (error) {
      console.error('Error logging in...', error);
      alert("Invalid credentials");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h1 id="header"></h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input 
              type="text" 
              value={username}
              id="username" 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password}
              id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {!loginSignup && (
            <div className="input-group">
              <label>Email:</label>
              <input 
                type="email" 
                value={email}
                id="email" 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>
          )}
          <a className="toggle-link" onClick={swapLoginMethod}>
            {loginSignup ? "Switch to Sign Up" : "Switch to Login"}
          </a>
          <button type="submit" className="submit-btn">
            {loginSignup ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
