import React from "react";
import { useNavigate } from "react-router-dom";


function Alice() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="alice-page">
      <div className="profile-section">
        <img
          src="/images/alice.png"
          alt="Dr. Alice"
          className="profile-picture"
        />
        <h1 className="alice-name">Dr. Alice <br>
      </br>  Senior Nutritionst</h1>
        <p className="alice-bio">
          Dr. Alice is a renowned expert in nutrition science with over 15
          years of experience. She specializes in creating tailored diet plans
          and promoting healthy eating habits to improve overall well-being.
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Alice to discuss your health goals and dietary needs.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Alice;