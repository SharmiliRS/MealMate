import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the #_=_ fragment if present
    if (window.location.hash === "#_=_") {
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }

    // Extract the authorization code from URL parameters
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");
    console.log("Authorization Code:", authorizationCode); // Log the code for debugging

    if (authorizationCode) {
      fetchAccessToken(authorizationCode);
    } else {
      console.error("No authorization code found");
      localStorage.setItem("wearables_status", "failed");
      navigate("/display-data"); // Redirect to the Display Data page
    }
  }, [location, navigate]);

  const fetchAccessToken = async (authorizationCode) => {
    const clientId = '23PWFN'; // Replace with your Fitbit client ID
    const clientSecret = 'a5a53bb8300ca84193bea3ae2a6d597c'; // Replace with your Fitbit client secret
    const redirectUri = 'https://mealmate-js.netlify.app/callback'; // Ensure this matches Fitbit settings

    // Create the base64-encoded Authorization header
    const authHeader = btoa(`${clientId}:${clientSecret}`);

    // Fitbit token endpoint
    const tokenUrl = "https://api.fitbit.com/oauth2/token";

    // Request body for token exchange
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    try {
      // Make a POST request to exchange the authorization code for tokens
      const response = await axios.post(tokenUrl, body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      });

      // Extract tokens and user information from the response
      const { access_token, refresh_token, user_id } = response.data;

      // Store tokens and user info in localStorage
      localStorage.setItem("fitbit_access_token", access_token);
      localStorage.setItem("fitbit_refresh_token", refresh_token);
      localStorage.setItem("fitbit_user_id", user_id);

      // Indicate successful wearable connection
      localStorage.setItem("wearables_status", "success");

      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);

      // Redirect to the Display Data page
      navigate("/display-data");
    } catch (error) {
      console.error("Error fetching the access token:", error.response?.data || error.message);

      // Indicate failure in connecting to wearables
      localStorage.setItem("wearables_status", "failed");

      // Redirect to the Display Data page
      navigate("/display-data");
    }
  };

  return (
    <div className="callback-page">
      <style>
        {`
          @keyframes spin {
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

          @media (max-width: 768px) {
            .callback-text {
              font-size: 1.5rem;
            }

            .loader {
              width: 40px;
              height: 40px;
            }
          }

          @media (max-width: 480px) {
            .callback-text {
              font-size: 1.2rem;
            }

            .loader {
              width: 35px;
              height: 35px;
            }
          }
        `}
      </style>
      <div className="callback-container">
        <div className="callback-text">Redirecting...</div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Callback;
