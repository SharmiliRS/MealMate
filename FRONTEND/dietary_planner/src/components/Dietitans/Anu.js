import React from "react";
import { useNavigate } from "react-router-dom";


function Anu() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="doctors-page">
      <div className="profile-section">
        <img
          src="/images/Anu.png"
          alt="Dr. Anu"
          className="profile-picture"
        />
        <h1 className="doctor-name">Dr. Anu Gupta <br>
      </br> Holistic Nutritionist</h1>
        <p className="doctor-bio">
          Dr. Anu Gupta is a expert in holistic nutrition , She specializes in creating tailored diet plans
          and promoting healthy eating habits to improve overall well-being.
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Anu  to discuss your health goals and dietary needs.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Anu;