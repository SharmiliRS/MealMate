import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SuggestFood = () => {
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Retrieve suggestions from state passed via navigate
  const location = useLocation();
  const { suggestions } = location.state || {}; // suggestions hold the backend response

  useEffect(() => {
    if (!suggestions || suggestions.length === 0) {
      setError("No food suggestions found based on your input.");
    } else {
      setFoodSuggestions(suggestions); // Set the received suggestions
      setError(""); // Clear any previous errors
    }
    setLoading(false); // Stop loading spinner
  }, [suggestions]);

  return (
    <div className="suggest-food-page">
      <h1>Suggested Food Items</h1>

      {/* Loading Spinner */}
      {loading && <p>Loading food suggestions...</p>}

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Food Suggestions List */}
      {!loading && !error && foodSuggestions.length > 0 ? (
        <div className="food-list">
          {foodSuggestions.map((food, index) => (
            <div key={index} className="food-item">
              <h2>{food.name || "Unnamed Food"}</h2>
              <img src={food.imageurl}/>
              <p><strong>Ingredients:</strong> {food.ingredients?.join(", ") || "Not available"}</p>
              <p><strong>Cuisine:</strong> {food.cuisine || "Not specified"}</p>
              <p><strong>Calories:</strong> {food.calories !== undefined ? `${food.calories} kcal` : "Not specified"}</p>
              <p><strong>Category:</strong> {food.category || "No category available"}</p>
              <p><strong>Description:</strong> {food.description || "No description available"}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No food suggestions found based on your profile.</p>
      )}
    </div>
  );
};


export default SuggestFood;
