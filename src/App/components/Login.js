import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Adjusted path for App.css
import educationalIcon from '../images/online-education-icon4.gif';

function Login() {
  return (
    <div className="App">
      <div className="login-container">
        <div className="icon-container">
          <img
            src={educationalIcon}
            alt="Educational Icon"
            className="educational-icon"
          />
        </div>
        <div className="form-container">
          <h2>
            Welcome to <br />
            <span className="bold-text">KiteOn</span>
          </h2>
          <form>
            <input type="text" placeholder="Enter Username or Email Address" />
            <input type="password" placeholder="Enter Password" />
            <div className="form-actions">
              <Link to="/animated-text">
                <button type="button">LOG IN</button>
              </Link>
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </form>
          <div className="login-options">
            <div className="social-login">
              <p>or Log in with</p>
              <button className="google-btn">
                <i className="fab fa-google"></i> Google
              </button>
              <button className="facebook-btn">
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
            </div>
            <a href="/sign-up">Create my Edu Platform account!</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
