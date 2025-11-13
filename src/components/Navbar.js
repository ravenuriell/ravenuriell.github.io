import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaLaptopCode, FaEnvelope } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li data-label="Home"><Link to="/"><FaHome /></Link></li>
        <li data-label="About"><Link to="/about"><FaUser /></Link></li>
        <li data-label="Projects"><Link to="/projects"><FaLaptopCode /></Link></li>
        <li data-label="Contact"><Link to="/contact"><FaEnvelope /></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
