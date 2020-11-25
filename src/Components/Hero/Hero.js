import React from "react";
import "./Hero.css";
import Illustration from "../../assests/sitting-6.svg";

const Hero = () => {
  return (
    <div className = "hero">
      <div className = "hero-text">
        Get your idea built into an app 
        <span className = "hero-text-highlight"> fast</span> and 
        <span className = "hero-text-highlight"> at low cost</span>
      </div>
      <div className = "hero-img">
        <img src = {Illustration} />
      </div>
    </div>
  )
}

export default Hero;