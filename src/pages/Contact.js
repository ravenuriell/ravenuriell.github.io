import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import "./Contact.css";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function Contact() {
  const bgRef = useRef();
  const [fade, setFade] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  React.useEffect(() => {
    const timeout = setTimeout(() => setFade(false), 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleNavigate = (path) => {
    setFade(true);
    if (bgRef.current && typeof bgRef.current.triggerZoom === "function") {
      bgRef.current.triggerZoom();
    }
    setTimeout(() => navigate(path), 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8vkcngk", // Replace with your EmailJS service ID
        "template_0hd7ioy", // Replace with your EmailJS template ID
        e.target,
        "7XnsXbYie3sgNwn8p" // Replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage("Message sent successfully! ✅");
          setStatusType("success");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
          setStatusMessage("Oops! Something went wrong. ❌");
          setStatusType("error");
        }
      );
  };

  return (
    <div className="contact-page">
      <ThreeBackground ref={bgRef} />
      <div className={`fade-overlay ${!fade ? "fade-out" : ""}`} />

      <h2 className="contact-top-title">CONTACT</h2>

      <section className="contact-container">
        <h2 className="contact-header">Let’s Get in Touch!</h2>
        <p className="contact-description">
          Thank you for looking through my website, feel free to reach out!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="user_name" type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input id="email" name="user_email" type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" placeholder="Type your message..." rows="5" required></textarea>
          </div>

          <button type="submit" className="send-btn">Send Message</button>
        </form>

        {statusMessage && (
          <p className={`status-message ${statusType}`}>{statusMessage}</p>
        )}

        <div className="social-links">
          <a href="mailto:ravenuriell@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope /> Email
          </a>

          <a href="https://github.com/ravenuriell" target="_blank" rel="noopener noreferrer">
            <FaGithub /> GitHub
          </a>

          <a href="https://www.linkedin.com/in/ravenuriell" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </section>

      <div className="contact-footer">
        <button className="contact-btn" onClick={() => handleNavigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Contact;
