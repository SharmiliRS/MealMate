import React from "react";
import { useNavigate } from "react-router-dom";


function Santhoshi() {
  const navigate = useNavigate();

  const handlePaymentNavigation = () => {
    navigate("/PaymentPage"); // Navigate to the payment page
  };

  return (
    <div className="santhoshi-page">
      <div className="profile-section">
        <img
          src="/images/santhoshi.png"
          alt="Dr. Santhoshi"
          className="profile-picture"
        />
        <h1 className="Santhoshi-name">Dr. Santhoshi<br></br> Nutrition Specialist</h1>
        <p className="Santhoshi-bio">
        Dr. Santhoshi is a skilled nutrition specialist dedicated to helping individuals achieve optimal health through
         personalized dietary strategies. With a deep understanding of the science of nutrition,
          Dr. Santhoshi focuses on promoting balanced eating habits, preventing chronic diseases, 
          and enhancing overall well-being. His expertise includes creating tailored meal plans, 
          conducting nutritional assessments, and providing guidance on sustainable lifestyle changes.
        </p>
      </div>

      <div className="payment-section">
        <h2 className="payment-title">Book a Consultation</h2>
        <p className="payment-description">
          consultation with Dr. Santhoshi to discuss your health goals and develop a personalized plan.
        </p>
        <button className="payment-button" onClick={handlePaymentNavigation}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Santhoshi;