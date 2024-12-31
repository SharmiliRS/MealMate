import React from "react";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Simulate authentication status (Replace this with actual auth logic)
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const dietitian = () => {
    if (isAuthenticated) {
      navigate("/dietitian");
    } else {
      alert("Please sign in to access the Dietitian page.");
      navigate("/signin"); // Redirect to signin page
    }
  };

  const dietplan = () => {
    if (isAuthenticated) {
      navigate("/dietplan");
    } else {
      alert("Please sign in to access the Diet Plan page.");
      navigate("/signin"); // Redirect to signin page
    }
  };

  const trackProgress = () => {
    if (isAuthenticated) {
      navigate("/trackprogress");
    } else {
      alert("Please sign in to access the Track Progress page.");
      navigate("/signin"); // Redirect to signin page
    }
  };

  return (
    <div>
      <div className="intro">
      <video className="background-video" autoPlay loop muted>
        <source src="/images/bg-video.mp4" type="video/mp4" />
      </video>
        <p>
          MEALMATE
          <br />
          BITE INTO WELLNESS...
        </p>
      </div>
      <div className="intro-details">
        <p>
          <img className="bg-pt" alt="pt" src="\images\Vector.png" /> Proper
          diet tracking
        </p>
        <br />
        <p>
          <img className="bg-pt" alt="pt" src="\images\Vector.png" /> Medical
          reminder assistance
        </p>
        <br />
        <p>
          <img className="bg-pt" alt="pt" src="\images\Vector.png" /> Accurate
          activity tracking
        </p>
      </div>
      <div className="grid">
        <p className="grid-intro">
          Eating a wide variety of healthy foods helps to keep you in good
          health and protects you against chronic disease.
        </p>

        <div className="imgss">
          <div className="img-grid">
            <img
              className="diet"
              alt="dietplan"
              src="\images\dietplan.png"
              onClick={dietplan}
            />
            <br />
            <p>DIET PLAN</p>
          </div>

          <div className="img-grid">
            <img
              className="track"
              alt="track"
              src="\images\track.png"
              onClick={trackProgress}
            />
            <br />
            <p>TRACK PROGRESS</p>
          </div>

          <div className="img-grid">
            <img
              className="dietitian"
              alt="dietitian"
              src="\images\dietitan.png"
              onClick={dietitian}
            />
            <br />
            <p>DIETITIANS</p>
          </div>
        </div>
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
}

export default Home;
