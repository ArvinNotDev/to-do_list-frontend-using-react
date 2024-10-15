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
    const email = loginSignup ? null : document.getElementById("email").value; // Get email only if signing up
  
    try {
      const response = await fetch(loginSignup 
        ? 'http://127.0.0.1:8000/accounts/login/' 
        : 'http://127.0.0.1:8000/accounts/user/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, ...(email && { email }) }), // Include email only if signing up
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Error: ";
  
        // Collect specific error messages based on the response from the server
        if (errorData.username) {
          errorMessage += `Username: ${errorData.username.join(', ')}. `;
        }
        if (errorData.password) {
          errorMessage += `Password: ${errorData.password.join(', ')}. `;
        }
        if (errorData.email) {
          errorMessage += `Email: ${errorData.email.join(', ')}. `;
        }
  
        throw new Error(errorMessage.trim()); // Throw the constructed error message
      }
  
      const result = await response.json();
      localStorage.setItem('access', result.access);
  
      // Clear inputs
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      if (!loginSignup) {
        document.getElementById("email").value = ""; // Clear email input on successful signup
      }
  
      // Redirect to home
      window.location.href = "/";
    } catch (error) {
      console.error('Error:', error);
      alert(loginSignup ? "Invalid login credentials" : error.message || "Sign up failed"); // Different alert for login/signup
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      if (!loginSignup) {
        document.getElementById("email").value = ""; // Clear email input on error
      }
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
