import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Dietitian from "./components/Dietitian";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import DietPlan from "./components/Dietplan";
import Callback from "./components/Callback";
import SuggestFood from "./components/Suggestfood";
import DisplayData from "./components/Displaydata";
import TrackProgress from "./components/Trackprogress";
import Alice from "./components/Dietitans/Alice";
import Mohan from "./components/Dietitans/Mohan";
import Santhoshi from "./components/Dietitans/Santhoshi";
import Neil from "./components/Dietitans/Neil";
import Vali from "./components/Dietitans/Vali";
import Anu from "./components/Dietitans/Anu";
import PaymentPage from "./components/Dietitans/Payment";
import Upi from "./components/Dietitans/Upi";
import Chatbot from "./components/Dietitans/Chatbot";

function App() {
  
  return (
    
    <Router>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dietitian" element={<Dietitian />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/suggest-food" element={<SuggestFood />}/>
        <Route path="/display-data" element={<DisplayData />} />
        <Route path="/trackprogress" element={<TrackProgress />} />
        <Route path="/alice" element={<Alice />} />
        <Route path="/santhoshi" element={<Santhoshi />} />
        <Route path="/neil" element={<Neil />} />
        <Route path="/vali" element={<Vali />} />
        <Route path="/mohan" element={<Mohan />} />
        <Route path="/anu" element={<Anu />} />
        <Route path="/PaymentPage" element={<PaymentPage/>} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/upi" element={<Upi/>} />
        

      </Routes>
    </Router>
  );
}

export default App;
