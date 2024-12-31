import React from "react";
import { useNavigate } from "react-router-dom";


function Mohan() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="Mohan-page">
      <div className="profile-section">
        <img
          src="/images/Mohan.png"
          alt="Dr. Mohan"
          className="profile-picture"
        />
        <h1 className="Mohan-name">Dr. Mohan <br>
      </br>  Nutrigenomics Specialist</h1>
        <p className="Mohan-bio">
          Dr. Mohan is a renowned expert in Nutrigenomics science with over 10
          years of experience. 
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Mohan to discuss your health goals and dietary needs.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Mohan;