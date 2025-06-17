import React from "react";
import "../styles/logIn.css";
import logo from "../styles/images/logo.png";

const LogIn = () => {
  return (
    <div className="login-container">
      <div className="login-avatar">
        <img src={logo} alt="Avatar" className="avatar-img" />
      </div>
      <button className="login-button">Log In</button>
    </div>
  );
};

export default LogIn;
