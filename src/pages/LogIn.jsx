import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
import logo from '../styles/images/logo.png';

function LogIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home'); // Go to homepage after login
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1 className="login-title">Topify</h1>
      <p className="login-subtitle">
        Your listening<br />status<br />Everywhere
      </p>
      <button className="login-button" onClick={handleLogin}>log in</button>
    </div>
  );
}

export default LogIn;