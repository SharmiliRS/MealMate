import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Upi = () => {
  const [upiId, setUpiId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "upiId") setUpiId(value);
    if (name === "payeeName") setPayeeName(value);
    if (name === "amount") setAmount(value);
  };

  const validateForm = () => {
    const newErrors = {};

    // UPI ID validation (requires format 'example@bankname' with specific banks allowed)
if (!upiId.trim()) {
  newErrors.upiId = "UPI ID is required.";
} else if (!/^[a-zA-Z0-9_.]+@(sbi|hdfc|iob|kvb|icici|axis|pnb|canara|bob)$/.test(upiId)) {
  newErrors.upiId = "Please enter a valid UPI ID with a recognized bank name (e.g., example@sbi).";
}


    // Amount validation (check if the amount is selected and positive)
    if (!amount) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please select a valid amount.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // After successful form submission, navigate to the chatbot page
      alert("Payment successful! Navigating to Our doctor");
      navigate("/chatbot"); // This will navigate to the chatbot route
    }
  };

  return (
    <div className="upi-container">
      <div className="upi-form-section">
        <h2>UPI Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="upi-form-group">
            <label>UPI ID</label>
            <input
              type="text"
              name="upiId"
              value={upiId}
              onChange={handleInputChange}
              placeholder="Enter UPI ID"
            />
            {errors.upiId && <p className="error">{errors.upiId}</p>}
          </div>
          <div className="upi-form-group">
            <label>Payee Name</label>
            <input
              type="text"
              name="payeeName"
              value={payeeName}
              onChange={handleInputChange}
              placeholder="Enter Payee Name"
            />
          </div>
          <div className="upi-form-group">
            <label>Amount</label>
            <select
              name="amount"
              value={amount}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Amount</option>
              <option value="1700">Dr. Santhoshi - 1700</option>
              <option value="2500">Dr. Neil - 2500</option>
              <option value="2700">Dr. Vali - 2700</option>
              <option value="1500">Dr. Mohan - 1500</option>
              <option value="3500">Dr. Anu - 3500</option>
              <option value="3000">Dr. Alice - 3000</option>
            </select>
            {errors.amount && <p className="error">{errors.amount}</p>}
          </div>
          <button type="submit" className="upi-submit-btn">
            Submit
          </button>
        </form>
      </div>

      <div className="qr-section">
        {/* Optionally, you can show the QR code here */}
        {/* <QRCode value={generateQrString()} size={150} /> */}
      </div>
    </div>
  );
};

export default Upi;