import React from "react";
import { useNavigate } from "react-router-dom";


function Neil() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="Neil-page">
      <div className="profile-section">
        <img
          src="/images/neil.png"
          alt="Dr. Neil Khana"
          className="profile-picture"
        />
        <h1 className="Neil-name">Dr. Neil Khana<br></br>Health Coach</h1>
        <p className="Neil-bio">
        Dr. Neil is a highly skilled dietitian and health coach with a passion for 
        empowering individuals to achieve their health and wellness goals.
         With expertise in personalized nutrition plans and lifestyle coaching,
          Dr. Neil focuses on holistic approaches to improve physical health, 
          mental well-being, and long-term sustainability. 
          His empathetic and evidence-based strategies make him a trusted 
          advisor in guiding clients toward a balanced and healthier life.
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Neil Khana to discuss your health goals and develop a personalized plan.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Neil;