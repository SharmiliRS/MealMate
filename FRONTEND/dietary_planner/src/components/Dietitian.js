import React from "react";
import { useNavigate } from "react-router-dom";
function Dietitian(){
    const navigate = useNavigate();
   
        
      const Alice=()=>{
        navigate("/alice")
    
      }
      const Santhoshi=()=>{
        navigate("/santhoshi")
    
      }
      const Neil=()=>{
        navigate("/neil")
    
      }
      const Vali=()=>{
        navigate("/vali")
    
      }
      const Mohan=()=>{
        navigate("/mohan")
    
      }
      const Anu=()=>{
        navigate("/anu")
    
      }
    
    
    return (
        <div className="d-page">
        <div className="container">
            
    
        <div className="d-content">

            <h1 className="d-title">Dietitians</h1>
            
            <div className="d-grid">
            <div className="diet-grid1">
                <img className="diet-img" alt="dietitian" src="/images/alice.png" onClick={Alice}/> 
                <p>Dr. Alice</p></div>
            <div className="diet-grid2">
                <img className="diet-img" alt="dietitiant" src="/images/santhoshi.png" onClick={Santhoshi}/> <p> Dr. Santhoshi</p></div>
            <div className="diet-grid3">
                <img className="diet-img" alt="dietitian" src="/images/neil.png" onClick={Neil}/><p >Dr. Neil Khana</p>
            </div>
            <div className="diet-grid4">
                <img className="diet-img" alt="dietitian" src="/images/vali.png" onClick={Vali}/> <p> Dr. Vali</p></div>
            <div className="diet-grid5">
                <img className="diet-img" alt="dietitiant" src="/images/mohan.png"onClick={Mohan}/><p> Dr. Mohan</p></div>
            <div className="diet-grid6">
                <img className="diet-img" alt="dietitian" src="/images/anu.png" onClick={Anu}/> <p>Dr. Anu Gupta</p>
            </div> 
            </div> 
        </div>      
        </div>
    
   </div>

    );

};
export default Dietitian;