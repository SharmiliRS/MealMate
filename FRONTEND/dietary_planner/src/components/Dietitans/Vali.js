import React from "react";
import { useNavigate } from "react-router-dom";


function Vali() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="Vali-page">
      <div className="profile-section">
        <img
          src="/images/Vali.png"
          alt="Dr. Vali"
          className="profile-picture"
        />
        <h1 className="Vali-name">Dr. Vali <br>
      </br>  Senior Nutritionst</h1>
        <p className="Vali-bio">
          Dr. Vali is a Senior Nutritionst . She has over 8 years of experience in creating tailored diet plans
          and promoting healthy eating habits to improve overall well-being.
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Vali to discuss your health goals and dietary needs.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Vali;