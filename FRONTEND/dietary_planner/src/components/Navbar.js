import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // State to toggle menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State to track user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isAuthenticated") // Example: Check from localStorage
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    // Clear authentication-related storage and state
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);

    // Redirect to home page
    navigate("/home");
  };

  return (
    <div className="nav">
      <img className="logo" alt="logo" src="/images/logo.png" />
      <div className="app-name">MEALMATE</div>
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/contact">
              Contact
            </Link>
          </li>
          {isAuthenticated ? (
            // If user is authenticated, show Logout button
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                LOG OUT
              </button>
            </li>
          ) : (
            // If user is not authenticated, show Sign In and Sign Up buttons
            <>
              <li>
                <button className="btn-signin" onClick={handleSignin}>
                  SIGN IN
                </button>
              </li>
              <li>
                <button className="button-signup" onClick={handleSignup}>
                  SIGN UP
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}

export default Navbar;
