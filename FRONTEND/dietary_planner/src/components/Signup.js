import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Store error messages
  const [showPassword, setShowPassword] = useState(false); // Manage password visibility

  // Validate email to ensure it ends with '@gmail.com'
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return re.test(email);
  };

  // Validate password with at least one capital letter, one lowercase letter, one digit, one special character, and exactly 8 characters
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
      let data = {
        "name": name,
        "email": email,
        "password": password,
      };

      let response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let json = await response.json();
      console.log(json);

      if (response.ok) {
        alert(json.message); // Show success message
      } else {
        alert(json.message); // Show error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-body">
        <h1 className="welcome-text">Welcome to MealMate!</h1>
        <form className="signup-input-container" onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
          <input
            type="text"
            className="input-field"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            className="input-field"
            placeholder="Enter your Email"
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
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>
        <p className="signup-text">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
