import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import "./Home.css";
import profilePic from "../assets/raven.png";

function Home() {
  const bgRef = useRef();
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  const handleLetsGo = () => {
    setTimeout(() => {
      setFade(true);
    }, 100); 

    bgRef.current.triggerZoom();

    setTimeout(() => {
      navigate("/about");
    }, 1500); 
  };

  return (
    <div className={`home ${fade ? "fade-out" : ""}`}>
      <ThreeBackground ref={bgRef} />
      <div className="home-content-container">
        <div className="home-image">
          <img src={profilePic} alt="Raven" />
        </div>
        <div className="home-text">
          <h1>Raven Uriel</h1>
          <p>BS Computer Science with specialization in Software Engineering</p>
          <p>Developer | QA Analyst</p>
          <button className="lets-go-button" onClick={handleLetsGo}>
            Let's Go!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
