import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
import logo from '../styles/images/logo.png'; // replace this with the actual image path if needed

function LogIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // simulate login success
    navigate('/top-artists');
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1 className="login-title">Spotibimbas</h1>
      <p className="login-subtitle">Your listening<br />status<br />Everywhere</p>
      <button className="login-button" onClick={handleLogin}>log in</button>
    </div>
  );
}

export default LogIn;

