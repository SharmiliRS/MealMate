import React from "react";
import { IonIcon } from 'react-ion-icon';


function About() {
  
  return (
    <div className="about-page">
      

      {/* About Section */}
      <div className="a-body">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <div className="about-description">
            <p>
              <strong>MEALMATE</strong> is a comprehensive platform designed to help users
              maintain a balanced and healthy lifestyle through personalized diet plans
              and consultations with professional dietitians. Our aim is to make healthy
              eating simple, accessible, and sustainable for everyone.
            </p>
            <p>
              Whether you are looking to improve your diet, lose weight, or manage specific
              health conditions, MEALMATE connects you with expert dietitians who can create
              customized meal plans tailored to your needs.
            </p>
          </div>

          {/* Mission and Vision */}
          <div className="mission-vision">
            <div className="mission">
              <h2>Our Mission</h2>
              <p>
                To empower individuals with the tools and knowledge to make healthy eating
                a part of their everyday lives.
              </p>
            </div>
            <div className="vision">
              <h2>Our Vision</h2>
              <p>
                To become the go-to platform for individuals seeking professional dietary
                guidance and support for achieving a healthier future.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <img src="/images/alice.png" alt="Dr. Alice" />
                <p>Dr. Alice - Senior Dietitian</p>
              </div>
              <div className="team-member">
                <img src="/images/santhoshi.png" alt="Dr. Santhoshi" />
                <p>Dr. Santhoshi - Nutrition Specialist</p>
              </div>
              <div className="team-member">
                <img src="/images/neil.png" alt="Dr. Neil Khana" />
                <p>Dr. Neil Khana - Health Coach</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
            {/* Social Icons */}
            <ul className="social_icon">
              <li><a href="#"><IonIcon name="logo-facebook" /></a></li>
              <li><a href="#"><IonIcon name="logo-twitter" /></a></li>
              <li><a href="#"><IonIcon name="logo-linkedin" /></a></li>
              <li><a href="#"><IonIcon name="logo-instagram" /></a></li>
            </ul>
        <p>&copy; 2024 MEALMATE. All Rights Reserved.</p>

      </footer>
    </div>
  );
}

export default About;
