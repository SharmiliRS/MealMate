import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("DebitCard");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    nameOnCard: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    agreeToTerms: false,
    Amount: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "cardNumber") {
      // Remove non-digit characters and add a space every 4 digits
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else if (name === "expiration") {
      // Automatically format expiration date as MM/YY
      let formattedExpiration = value.replace(/\D/g, "").slice(0, 4); // Remove non-digits
      if (formattedExpiration.length > 2) {
        formattedExpiration = `${formattedExpiration.slice(0, 2)}/${formattedExpiration.slice(2)}`;
      }
      setFormData({
        ...formData,
        [name]: formattedExpiration,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error for the field
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else {
      // Check if the email ends with gmail.com or yahoo.com and has a valid domain
      const domainRegex = /@(gmail\.com|yahoo\.com)$/i;
      if (!domainRegex.test(formData.email) || formData.email.split('@')[1].split('.').length < 2) {
        newErrors.email = "Email must be a Gmail or Yahoo address.";
      }
    }

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    // Name on card validation
    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required.";
    }

    // Card number validation (strip spaces for validation purposes)
    const rawCardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!rawCardNumber.trim()) {
      newErrors.cardNumber = "Card number is required.";
    } else if (!/^\d{16}$/.test(rawCardNumber)) { // Fix to require exactly 16 digits
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Expiration date validation
    if (!formData.expiration.trim()) {
      newErrors.expiration = "Expiration date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiration)) {
      newErrors.expiration = "Expiration date must be in MM/YY format.";
    }

    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be exactly 3 digits.";
    }

    // Amount validation
    if (!formData.Amount.trim()) {
      newErrors.Amount = "Amount is required.";
    } else if (isNaN(Number(formData.Amount)) || Number(formData.Amount) <= 0) {
      newErrors.Amount = "Amount must be a positive number.";
    }

    // Terms and conditions validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Payment submitted successfully! Consult With Doctor");
      navigate("/chatbot");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "UPI") {
      navigate("/upi");
    }
  };

  return (
    <div className="payment-form-container">
      <h1 className="form-title">Payment Form Widget</h1>
      <div className="payment-method">
        <h3>Select Payment Method</h3>
        <div className="payment-options">
          <button
            className={paymentMethod === "DebitCard" ? "active" : ""}
            onClick={() => handlePaymentMethodChange("DebitCard")}
          >
            Debit Card
          </button>
          <button
            className={paymentMethod === "UPI" ? "active" : ""}
            onClick={() => handlePaymentMethodChange("UPI")}
          >
            UPI
          </button>
        </div>
      </div>

      {paymentMethod === "DebitCard" && (
        <form className="payment-form" onSubmit={handleSubmit}>
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <h3>Debit Card Info</h3>
          <div className="form-group">
            <label>Name on Card</label>
            <input
              type="text"
              name="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleInputChange}
              required
            />
            {errors.nameOnCard && <p className="error">{errors.nameOnCard}</p>}
          </div>

          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength="19"
              required
            />
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <select
                name="Amount"
                value={formData.Amount}
                onChange={handleInputChange}
                required
              >
               <option value="">Select Amount</option>
                <option value="3000">Dr. Alice - 3000</option>
                <option value="1700">Dr. Santhoshi - 1700</option>
                <option value="2500">Dr. Neil - 2500</option>
                <option value="2700">Dr. Vali - 2700</option>
                <option value="1500">Dr. Mohan - 1500</option>
                <option value="3500">Dr. Anu - 3500</option>
              </select>
              {errors.Amount && <p className="error">{errors.Amount}</p>}
            </div>
            <div className="form-group">
              <label>Expiration</label>
              <input
                type="text"
                name="expiration"
                value={formData.expiration}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
              {errors.expiration && <p className="error">{errors.expiration}</p>}
            </div>
            <div className="form-group">
              <label>CVV Number</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
              {errors.cvv && <p className="error">{errors.cvv}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <p>By checking this box, I agree to the Terms & Conditions & Privacy Policy.</p>
            </label>
            {errors.agreeToTerms && <p className="error">{errors.agreeToTerms}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default PaymentPage;