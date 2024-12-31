import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';  // Axios for making the token request

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");
    console.log("Authorization Code:", authorizationCode);  // Log the code
  
    if (authorizationCode) {
      fetchAccessToken(authorizationCode);
    } else {
      console.error("No authorization code found");
      localStorage.setItem("wearables_status", "failed");
      navigate("/display-data");
    }
  }, [location]);
  

  const fetchAccessToken = async (authorizationCode) => {
    const clientId = '23PWFN';  // Replace with your Fitbit client ID
    const clientSecret = 'a5a53bb8300ca84193bea3ae2a6d597c';  // Replace with your Fitbit client secret
    const redirectUri = 'https://mealmate-js.netlify.app/callback';  // Replace with your redirect URI
    // Create the base64-encoded Authorization header
    const authHeader = btoa(`${clientId}:${clientSecret}`);
    
    // Make a POST request to the Fitbit API to exchange code for an access token
    const tokenUrl = "https://api.fitbit.com/oauth2/token";
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    });

    try {
      const response = await axios.post(tokenUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`, // Add the Basic Auth header
        },
      });

      // Extract access token from the response
      const { access_token, refresh_token, user_id } = response.data;

      // Store the tokens and user info
      localStorage.setItem("fitbit_access_token", access_token);
      localStorage.setItem("fitbit_refresh_token", refresh_token);
      localStorage.setItem("fitbit_user_id", user_id);

      // Set wearables_status to "success" in localStorage
      localStorage.setItem("wearables_status", "success");

      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);
      
      // Redirect the user to the Display page
      navigate("/display-data");
    } catch (error) {
      console.error("Error fetching the access token:", error);
      // Set wearables_status to "failed" if an error occurs
      localStorage.setItem("wearables_status", "failed");
      navigate("/display-data");  // Navigate to the DisplayData page on failure
    }
  };

  return (
    <div className="callback-page">
      <style>
        {
          `@keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .callback-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
          }

          .callback-text {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #333;
          }

          .loader {
            border: 10px solid #f3f3f3;
            border-top: 10px solid rgb(0, 77, 27);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .callback-text {
              font-size: 1.5rem;
            }

            .loader {
              width: 40px;
              height: 40px;
            }
          }

          /* Tablet responsiveness */
          @media (max-width: 480px) {
            .callback-text {
              font-size: 1.2rem;
            }

            .loader {
              width: 35px;
              height: 35px;
            }
          }`
        }
      </style>
      <div className="callback-container">
        <div className="callback-text">Redirecting...</div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Callback;
