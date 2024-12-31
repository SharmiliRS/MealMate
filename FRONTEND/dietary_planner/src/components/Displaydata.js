import React, { useState, useEffect } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import axios from "axios";

const DisplayData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Fitbit Data States
  const [heartRateData, setHeartRateData] = useState(null);
  const [sleepData, setSleepData] = useState(null);
  const [stepsData, setStepsData] = useState(null);
  const [caloriesData, setCaloriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredients, setIngredients] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [medicalConditions,setMedicalCondition] = useState('');
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  


  const medicalConditionsList = [
    "Diabetes",
    "High BP",
    "Low BP",
    "Cholesterol",
    "Low cholesterol",
    "Obesity",
    "Weight Loss",
    "Heart Disease",
    "Arthritis",
    "Asthma",
    "Energy Boost",
    "Low Sugar",
    "High Sugar",
    
  ];
  

  // Manual Data State
  const [manualData, setManualData] = useState(() => {
    const storedData = localStorage.getItem("manual_data");
    return storedData ? JSON.parse(storedData) : {}; // Fallback to an empty object
  });

  // Function to fetch Fitbit data
  const fetchFitbitData = async () => {
    const accessToken = localStorage.getItem("fitbit_access_token");
  
    if (!accessToken) {
      setError("No Fitbit access token found. Please connect your wearables.");
      return;
    }
  
    setLoading(true);
    setError(""); // Reset error before starting the request
  
    const today = new Date();
  const specificDate = today.toISOString().split('T')[0];
    try {
      // Fetch Heart Rate Data (for the specific date)
      const heartRateResponse = await axios.get(
        `https://api.fitbit.com/1/user/-/activities/heart/date/${specificDate}/1d.json`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("Heart Rate Response:", heartRateResponse); // Debug log
      setHeartRateData(heartRateResponse.data);

      // Fetch Sleep Goal Data
      const sleepResponse = await axios.get(
        `https://api.fitbit.com/1.2/user/-/sleep/goal.json`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Sleep Response:", sleepResponse); // Debug log
      setSleepData(sleepResponse.data);

      // Fetch Activity Goals Data
      const goalsResponse = await axios.get(
        'https://api.fitbit.com/1/user/-/activities/goals/daily.json',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Goals Response:", goalsResponse); // Debug log

      // Safely check if the data exists and has the correct structure
      if (goalsResponse.data && goalsResponse.data.goals) {
        const stepsGoal = goalsResponse.data.goals.steps; // Daily steps goal
        const caloriesGoal = goalsResponse.data.goals.caloriesOut; // Daily calories goal

        // Set the state with the data
        setStepsData(stepsGoal);
        setCaloriesData(caloriesGoal);
      } else {
        console.error("Invalid API response structure:", goalsResponse.data);
      }
   

    } catch (err) {
      console.error("Error fetching Fitbit data:", err.response || err);
      setError(`Failed to fetch Fitbit data: ${err.response ? err.response.data.errors[0].message : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is connected and fetch Fitbit data if necessary
  useEffect(() => {
    const wearablesStatus = localStorage.getItem("wearables_status");

    if (wearablesStatus === "success") {
      alert("Successfully connected to wearables!");
      fetchFitbitData(); // Fetch Fitbit data if the connection is successful
    } else if (wearablesStatus === "failed") {
      alert("Failed to connect to wearables. Please try again.");
    }

    localStorage.removeItem("wearables_status"); // Clear the status
  }, []);

  // Polling for updates every minute
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Polling Fitbit data..."); // Log when polling happens
      fetchFitbitData(); // Fetch the latest Fitbit data periodically
    }, 60000); // Every minute (60000ms)

    return () => clearInterval(interval); // Clear the interval when component is unmounted
  }, []);

  // Function to handle connection to wearables (Fitbit OAuth process)
  const handleConnectToWearables = () => {
    window.location.href = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23PWFN&redirect_uri=http://localhost:3000/callback&scope=activity%20nutrition%20heartrate%20sleep%20profile`;
  };
// State to store condition and user data
const [condition, setCondition] = useState("");


useEffect(() => {
  // Retrieve data from localStorage
  const savedCondition = localStorage.getItem("condition");


  if (savedCondition) {
    setCondition(savedCondition);
  }

}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    setError('');
  
    const ingredientsArray = ingredients ? ingredients.split(',').map(item => item.trim().toLowerCase()) : [];
    const medicalConditionsArray = medicalConditions ? medicalConditions.split(',').map(item => item.trim().toLowerCase()) : [];
  
    try {
      const response = await axios.post('http://localhost:8080/suggest-food', {
        maxCalories: maxCalories || undefined,
        ingredients: ingredientsArray.join(','),  // Send as a comma-separated string
        medicalConditions: medicalConditionsArray.join(',')  // Same for medicalConditions
      });
      
  
      if (response.data.length === 0) {
        setError('No food suggestions found.');
      } else {
        setFoodSuggestions(response.data);
        navigate("/suggest-food", { state: { suggestions: response.data } });
      }
    } catch (err) {
      setError('Failed to fetch food suggestions.');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="display-data-page">
      <h1>Fitbit and Manual Data Dashboard</h1>
      <h2 style={{ textAlign: "center", color: "red", margin: "20px 0",fontSize : "1.3rem" }}>
        {condition || "No specific condition detected."}
      </h2>
      {/* Manual Data Section */}
      <div className="details-container">
        <h2>Manual Details</h2>
        <ul>
          <li>Age: {manualData.age || "N/A"}</li>
          <li>Gender: {manualData.gender || "N/A"}</li>
          <li>Height: {manualData.height || "N/A"} cm</li>
          <li>Weight: {manualData.weight || "N/A"} kg</li>
          <li>Sugar Level: {manualData.sugarLevel || "N/A"} mg/dL</li>
          <li>Blood Pressure: {manualData.bloodPressure || "N/A"} mmHg</li>
        </ul>
      </div>
      {/* Loading Spinner */}
      {loading && <p style={{textAlign: "center", color: "#21865C", margin: "20px 0"}}>Loading Fitbit data...</p>}
      {/* Display Heart Rate Data */}
      <div className="details-container">
      <h2>Heart Rate Data:</h2>

        {heartRateData && heartRateData["activities-heart"]?.length > 0 ? (
          <ul>
            {heartRateData["activities-heart"][0]?.value?.heartRateZones?.map((zone, index) => (
              <li key={index}>
                <strong>{zone.name}:</strong> {zone.min} - {zone.max} bpm
              </li>
            ))}
          </ul>
        ) : (
          !loading && !error && <p>No heart rate data available.</p>
        )}
      </div>

      {/* Display Sleep Goal Data */}
      <div className="details-container">
      <h2>Sleep Data</h2>
        {sleepData && sleepData.goal ? (
          <div>
            <p className="fitbitdata"><strong>Sleep Duration: </strong>{sleepData.goal.minDuration} minutes</p>
            
          </div>
        ) : (
          <p>No sleep goal data available.</p>
        )}
      </div>

     {/* Display Steps Data */}
<div className="details-container">
  <h2>Steps Data</h2>
  {stepsData !== null ? (
    <div>
      <p className="fitbitdata"><strong>Steps Goal: </strong>{stepsData} steps</p>
    </div>
  ) : (
    <p>No steps data available.</p>
  )}
</div>

{/* Display Calories Data */}
<div className="details-container">
  <h2>Calories Goal</h2>
  {caloriesData !== null ? (
    <div>
      <p className="fitbitdata"><strong>Calories Goal: </strong>{caloriesData} kcal</p>
    </div>
  ) : (
    <p>No calories data available.</p>
  )}
</div>

      {/* Button to reconnect to wearables */}
      <button
        className="wearables-btn"
        onClick={handleConnectToWearables}
      >
        CONNECT TO WEARABLES
      </button>
    
        
      <div className="details-container-food">
        <form onSubmit={handleSubmit} className="suggest-food-form">
          <h2>Food Suggestions</h2>

          {/* Ingredients Input */}
          <div>
            <label>Ingredients Restrictions</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g. paneer, chicken"
              required
            />
          </div>

          {/* Max Calories Input */}
          <div>
            <label>Max Calories</label>
            <input
              type="number"
              value={maxCalories}
              onChange={(e) => setMaxCalories(e.target.value)}
              placeholder="Enter max calories"
              required
            />
          </div>

          {/* Medical Condition Input */}
          <div className="dropdown">
            <label>Medical Condition</label>
            <select
              value={medicalConditions}
              onChange={(e) => setMedicalCondition(e.target.value)}
              required
            >
              <option value="">Select a condition</option>
              {medicalConditionsList.map((condition, index) => (
                <option key={index} value={condition.toLowerCase()}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="suggest-food-btn">SUGGEST FOOD</button>
        </form>
      </div>
    </div>
  );
};

export default DisplayData;
