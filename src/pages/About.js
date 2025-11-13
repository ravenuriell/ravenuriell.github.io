import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import "./About.css";
import profilePic from "../assets/profile.webp";
import InternshipGallery from "../components/InternshipGallery";
import InternshipGallery2 from "../components/InternshipGallery2";
import DragGallery from "../components/DragGallery";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

function About() {
  const bgRef = useRef();
  const [fade, setFade] = useState(false); 
  const navigate = useNavigate();

  const handleProjectsClick = () => {
    setFade(true); 
    if (bgRef.current && typeof bgRef.current.triggerZoom === "function") {
      bgRef.current.triggerZoom(); 
    }
    setTimeout(() => {
      navigate("/projects"); 
    }, 1500); 
  };

  return (
    <div className="about-page">
      {/* Three.js Background */}
      <ThreeBackground ref={bgRef} />

      {/* Fade overlay */}
      <div className={`fade-overlay ${fade ? "" : "fade-out"}`} />

      <h2 className="about-top-title">ABOUT ME</h2>

      {/* Academics Section */}
      <div className="about-content">
        <div className="about-text">
          <h1>
            <span className="hi-text">Hi!</span> <br />
            I'm <span className="name-glow">Raven Uriel G. Dela Cruz</span>
          </h1>
          <p>
            I have recently graduated from Far Eastern University, under the
            Institute of Technology.
            <br /><br />
            I have graduated under BS Computer Science with specialization in
            Software Engineering. I was a Dean’s Lister during my time in FEU
            Tech, but unfortunately I was a few points off to get Latin Honors.
            I was an active student leader, being an officer in several
            organizations — namely the Association of Computing Machinery (ACM),
            the Association of Student Technopreneurs and Innovators (ASTI), and
            Artist Connection - Exude Dancers (AC-ED).
          </p>
        </div>

        <div className="about-image">
          <img src={profilePic} alt="Raven Uriel G. Dela Cruz" />
        </div>
      </div>

      {/* Internships Section */}
      <section className="internships-section">
        <h2 className="internship-header">Internship Experience</h2>

        <div className="internship-item">
          <h3>📝 Quality Assurance Analyst Intern — Hooli Software 📝</h3>
          <p>
            • Executed several Testing methodologies over many projects. (Smoke Testing, 
            Sanity Testing, Regression Testing, etc.)<br />
            • Created and modified test cases on various projects based 
            on client’s specifications and needs.<br />
            • Managed presentations and documentations of the outcome of
            the testing methodologies.<br />
            • Documented found anomalies and errors through Jira.<br />
            • Presented testing outcomes to company higher ups every week.<br />
            • Assisted other QA Analysts on projects that need extra help.
          </p>
        </div>

        <div className="internship-section">
          <p>Here are some snapshots from my internship experiences at Hooli Software.</p>
          <InternshipGallery />
        </div>

        <div className="internship-item">
          <h3>🖥️ Exhibit Developer — Convey Health Solutions 🖥️</h3>
          <p>
            • Developed tailored scripts for exhibit management automation using JavaScript in Inspire Scaler.<br />
            • Developed Exhibits according to the client's templates and recommendations.<br />
            • Created and tested workflows for validation and management. <br />
            • Managed Exhibits in a SQL Server Management Database<br />
            • Documented Scripts, Exhibits, and workflows.<br />
            • Assists lead developers in handling and maintaining exhibits.
          </p>
        </div>

        <div className="internship-section">
          <p>Here are some snapshots from my internship experiences at Convey Health Solutions.</p>
          <InternshipGallery2 />
        </div>
      </section>

      {/* Drag Section */}
      <div className="drag-section">
        <div className="drag-image">
          <DragGallery />
        </div>

        <div className="drag-text">
          <h2 className="drag-title">My Drag Career</h2>
          <h3 className="drag-subtitle">as Lustavia</h3>
          <p>
            Outside of technology, I step into the world of performance and creativity through the artform of drag (and cosplay).
            <br /><br />
            Performing has always been a passion of mine ever since I was little. And drag as a platform enabled me
            to do everything I wanted to do. From lipsyncing, making costumes, styling wigs, doing my makeup and nails and having
            the overpowering confidence that drag gives me.
            <br /><br />
            I've had the privilege of performing for my own school several times, in front of notable celebrities,
            guesting in a TV game show, guesting in conventions, and winning competitions.
          </p>
        </div>

        <div className="drag-socials">
          <p className="socials-title">
            Connect with <span className="glow-pink">Lustavia</span>!
          </p>
          <div className="social-icons">
            <a href="https://www.instagram.com/lustaviaa/e" target="_blank" rel="noopener noreferrer" title="Go to Lustavia's Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/mntgasiuriel/" target="_blank" rel="noopener noreferrer" title="Go to Lustavia's Facebook">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@lustaviaa" target="_blank" rel="noopener noreferrer" title="Go to Lustavia's TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Projects Button */}
      <div className="projects-footer">
        <button className="projects-btn" onClick={handleProjectsClick}>
          Go to Projects
        </button>
      </div>
    </div>
  );
}

export default About;
