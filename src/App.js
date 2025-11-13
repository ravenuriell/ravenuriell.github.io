import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar stays on top for all pages */}
      <Routes>
        <Route path="/" element={<Home />} />       {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/projects" element={<Projects />} /> {/* Projects page */}
        <Route path="/contact" element={<Contact />} />   {/* Contact page */}
      </Routes>
    </Router>
  );
}

export default App;
