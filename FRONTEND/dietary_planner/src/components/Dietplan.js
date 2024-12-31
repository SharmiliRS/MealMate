import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

const DietPlan = () => {
  const navigate = useNavigate();

  // State for manual inputs
  const [manualData, setManualData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    sugarLevel: "",
    bloodPressure: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({});
  const [condition, setCondition] = useState("");

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Validate age (positive integer less than 100)
    if (!manualData.age || manualData.age <= 0 || manualData.age >= 100 || !Number.isInteger(Number(manualData.age))) {
      newErrors.age = "Age must be a positive whole number less than 100.";
    }

    // Validate gender (dropdown options)
    const validGenders = ["Male", "Female", "Other"];
    if (!manualData.gender || !validGenders.includes(manualData.gender)) {
      newErrors.gender = 'Gender must be "Male", "Female", or "Other".';
    }

    // Validate height (positive number within a reasonable range)
    if (!manualData.height || manualData.height <= 0 || manualData.height > 300) {
      newErrors.height = "Height must be a positive number less than or equal to 300 cm.";
    }

    // Validate weight (positive number within a reasonable range)
    if (!manualData.weight || manualData.weight <= 0 || manualData.weight > 200) {
      newErrors.weight = "Weight must be a positive number less than or equal to 200 kg.";
    }

    // Validate sugar level (reasonable range 70-130 mg/dL)
    if (!manualData.sugarLevel || manualData.sugarLevel < 70 || manualData.sugarLevel > 200) {
      newErrors.sugarLevel = "Sugar level must be between 70 and 200 mg/dL.";
    }

    // Validate blood pressure (reasonable range 80-180 mmHg)
    if (!manualData.bloodPressure || manualData.bloodPressure < 80 || manualData.bloodPressure > 180) {
      newErrors.bloodPressure = "Blood pressure must be between 80 and 180 mmHg.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Determine conditions based on sugar, blood pressure levels, and obesity
    let conditions = [];

    // Check for sugar levels
    if (manualData.sugarLevel < 70) {
      conditions.push("You have low sugar.");
    } else if (manualData.sugarLevel > 130) {
      conditions.push("You are diabetic.");
    }

    // Check for blood pressure levels
    if (manualData.bloodPressure < 80) {
      conditions.push("You have low blood pressure.");
    } else if (manualData.bloodPressure > 130) {
      conditions.push("You have high blood pressure.");
    }

    // Check for obesity (BMI > 30)
    const heightInMeters = manualData.height / 100; // Convert height to meters
    const bmi = manualData.weight / (heightInMeters * heightInMeters); // Calculate BMI
    if (bmi > 30) {
      conditions.push("You are obese.");
    }

    // If no conditions are met
    if (conditions.length === 0) {
      conditions.push("Your health metrics are within a normal range.");
    }

    // Combine conditions into a single string
    const conditionString = conditions.join(" ");

    // Store data and condition in localStorage
    localStorage.setItem("manual_data", JSON.stringify(manualData));
    localStorage.setItem("condition", conditionString);

    // Update condition in the state
    setCondition(conditionString);

    // Navigate to DisplayData page
    navigate("/display-data", { state: { userData: manualData, condition: conditionString } });
  };

  return (
    <div className="dietary-planner-page">
      <div className="planner-container">
        <h1 className="planner-title">
          <em>DIETARY PLANNER</em>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <div>
              <label>
                <em>AGE</em>
              </label>
              <input
                type="number"
                value={manualData.age}
                onChange={(e) => setManualData({ ...manualData, age: e.target.value })}
                placeholder="Enter Age"
              />
              {errors.age && <p className="error-message">{errors.age}</p>}
            </div>
            <div className="gen-dropdown">
              <label>
                <em>GENDER</em>
              </label>
              <select
                value={manualData.gender}
                onChange={(e) => setManualData({ ...manualData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>
            <div>
              <label>
                <em>HEIGHT</em>
              </label>
              <input
                type="number"
                value={manualData.height}
                onChange={(e) => setManualData({ ...manualData, height: e.target.value })}
                placeholder="Enter Height (cm)"
              />
              {errors.height && <p className="error-message">{errors.height}</p>}
            </div>
            <div>
              <label>
                <em>SUGAR LEVEL</em>
              </label>
              <input
                type="number"
                value={manualData.sugarLevel}
                onChange={(e) => setManualData({ ...manualData, sugarLevel: e.target.value })}
                placeholder="Enter Sugar Level (mg/dL)"
              />
              {errors.sugarLevel && <p className="error-message">{errors.sugarLevel}</p>}
            </div>
            <div>
              <label>
                <em>WEIGHT</em>
              </label>
              <input
                type="number"
                value={manualData.weight}
                onChange={(e) => setManualData({ ...manualData, weight: e.target.value })}
                placeholder="Enter Weight (kg)"
              />
              {errors.weight && <p className="error-message">{errors.weight}</p>}
            </div>
            <div>
              <label>
                <em>BLOOD PRESSURE</em>
              </label>
              <input
                type="number"
                value={manualData.bloodPressure}
                onChange={(e) => setManualData({ ...manualData, bloodPressure: e.target.value })}
                placeholder="Enter BP (mmHg)"
              />
              {errors.bloodPressure && <p className="error-message">{errors.bloodPressure}</p>}
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="d-submit-btn">
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      <footer>
        {/* Social Icons */}
        <ul className="social_icon">
          <li>
            <p>
              <IonIcon name="logo-facebook" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-twitter" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-linkedin" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-instagram" />
            </p>
          </li>
        </ul>

        {/* Copyright */}
        <p className="copyright">&copy; 2024 MEALMATE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DietPlan;
