import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeBackground from "../components/ThreeBackground";
import "./Projects.css";
import GitHubRepos from "../components/GitHubRepos";

function Projects() {
  const bgRef = useRef();
  const [fade, setFade] = useState(true);
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

  return (
    <div className="projects-page">
      <ThreeBackground ref={bgRef} />
      <div className={`fade-overlay ${!fade ? "fade-out" : ""}`} />

      <h2 className="projects-top-title">PROJECTS</h2>

      {/* FAR Project Section */}
      <section className="project-section far-section">
        <h2 className="project-title">FAR (Furniture Augmented Reality)</h2>
        <p className="project-description">
          FAR is an Augmented Reality application made from Unity and C# that allows users to visualize furniture
          pieces directly in their own space using their mobile device’s camera. It was
          developed using Unity and AR Foundation, with models built in Blender for real-time rendering.
        </p>

        <div className="project-video">
          <iframe
            src="https://drive.google.com/file/d/1Fd8sefGe9flCycf17ZbQU2x962rwqDUs/preview"
            width="640"
            height="360"
            allow="autoplay"
            allowFullScreen
            title="FAR Demo"
          ></iframe>
        </div>

        <p className="project-details">
          This project focused on creating a interactive AR experience for
          home decor shoppers, letting them place 3D models of furniture in their environment
          and interact with them in real time. The app is only avaiable on android.
          <br />
          <br />
          View on github for more details, Documentation, APK download!
        </p>

        <a
          href="https://github.com/ravenuriell/Furniture-Augmented-Reality"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View on GitHub
        </a>
      </section>

      {/* Hottie Tower Project Section */}
      <section className="project-section hottie-section">
        <h2 className="project-title">Hottie Tower</h2>
        <p className="project-description">
          Hottie Tower is a simple infinite platformer game where players jump
          across platforms, trying to climb as high as possible while avoiding
          falling as the screen scrolls up with the player with increasing speed.
          The game features platform generation, score tracking, and
          a fun casual experience.
        </p>

        <div className="project-video">
          <iframe
            src="https://drive.google.com/file/d/1hghng8katgrSO3SUemODc8HNRKU4Dx9f/preview"
            width="640"
            height="360"
            allow="autoplay"
            allowFullScreen
            title="Hottie Tower Demo"
          ></iframe>
        </div>

        <p className="project-details">
          Built with Java and NetBeans IDE, Hottie Tower showcases platformer gameplay
          and a UI designed for desktop. This project demonstrates gameplay loop design, a leaderboard,
          2 difficulty modes, and a guaranteed fun time when you play!
          <br />
          <br />
          View on GitHub for Instructions and .exe file!
        </p>

        <a
          href="https://github.com/ravenuriell/Hottie-Tower"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View on GitHub
        </a>
      </section>

      {/* Portfolio Website Section */}
      <section className="project-section portfolio-section">
        <h2 className="project-title">This Website!</h2>
        <p className="project-description">
          This very website was fully designed and developed by me using modern web
          technologies — <strong>React.js</strong>, <strong>JavaScript</strong>, and
          <strong> CSS</strong>. It serves as an interactive digital portfolio that
          showcases myself, my skills, my projects, and creative background.
        </p>

        <p className="project-details">
          The site features animations, a custom 3D background powered by
          <strong> Three.js</strong>. Each section was crafted to reflect both
          my technical capabilities and artistic personality.
        </p>

        <a
          href="https://github.com/ravenuriell/ravenuriell.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          View Source Code on GitHub
        </a>
      </section>

      {/* GitHub Repos Section */}
      <section className="projects-section">
        <h3 className="section-title">GitHub Repositories</h3>
        <GitHubRepos username="ravenuriell" />
      </section>

      {/* Navigation Footer */}
      <div className="projects-footer">
        <button className="projects-btn" onClick={() => handleNavigate("/Contact")}>
          Get in touch!
        </button>
      </div>
    </div>
  );
}

export default Projects;
