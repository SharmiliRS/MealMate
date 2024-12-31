import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
   const [showPassword, setShowPassword] = useState(false); // Manage password visibility
  const navigate = useNavigate(); // Initialize useNavigate


  // Validate email to ensure it ends with '@gmail.com'
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return re.test(email);
  };

  // Validate password with exactly 8 characters, at least one capital letter, one lowercase letter, one digit, and one special character
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!validateEmail(email)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    if (!validatePassword(password)) {
      // Check if password length is not 8 characters
      if (password.length !== 8) {
        setError('Password must be exactly 8 characters long.');
      } else {
        setError('Password must contain at least one capital letter, one lowercase letter, one digit, and one special character.');
      }
      return;
    }
    setError(''); // Clear any previous error

    try {
      const data = {
        email: email,
        password: password,
      };

      let response = await fetch("http://localhost:8080/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      let json = await response.json();
      console.log(json);

      if (response.ok) {
        alert(json.msg); // Show success message
        localStorage.setItem("isAuthenticated", "true"); // Set auth status
        navigate("/"); // Redirect to the Home page
      } else {
        alert(json.msg); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      {/* Login Form */}
      <div className="signin-form-section">
        <div className="welcome-text">
          <h2>Welcome back!</h2>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
          <input
              type={showPassword ? "text" : "password"}
              className="input-field password-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              maxLength={8}  // Restrict input to 8 characters
          />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
              
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
            </button>
          </div>
          <button type="submit" className="signin-button">
            SIGN IN
          </button>
        </form>
        <p className="signin-text">
          Don’t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
