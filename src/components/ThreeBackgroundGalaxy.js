// ThreeBackgroundGalaxy.js
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeBackgroundGalaxy = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();

    // 🎥 Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 🖥️ Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    // 🌌 GALAXY PARTICLES
    const particleCount = 3500;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    const colorCore = new THREE.Color(0x66ccff); // bright blue
    const colorMid = new THREE.Color(0xaa66ff); // purple
    const colorEdge = new THREE.Color(0xff99cc); // pink

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 10;
      const spinAngle = radius * 1.4;
      const branchAngle = ((i % 4) / 4) * Math.PI * 2;
      const randomOffset = (Math.random() - 0.5) * 0.3;

      const x = Math.cos(spinAngle + branchAngle) * radius + randomOffset;
      const y = (Math.random() - 0.5) * 0.6;
      const z = Math.sin(spinAngle + branchAngle) * radius + randomOffset;

      positions.push(x, y, z);

      const color = colorCore
        .clone()
        .lerp(colorMid, radius / 7)
        .lerp(colorEdge, radius / 10);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const starTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/sprites/circle.png"
    );

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: starTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxy = new THREE.Points(geometry, material);
    scene.add(galaxy);

    // 🌟 Glowing center
    const glowGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(core);

    // Animation variables
    let t = 0;
    let startTime = Date.now();
    const cameraDriftDuration = 20000; // 10 seconds
    const startZ = camera.position.z;
    const endZ = 4.2; // slight zoom-in for cinematic effect

    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.002;

      const elapsed = Date.now() - startTime;

      // Smooth zoom for first 10 seconds
      if (elapsed < cameraDriftDuration) {
        const progress = elapsed / cameraDriftDuration;
        camera.position.z = THREE.MathUtils.lerp(startZ, endZ, progress);
        camera.rotation.y = Math.sin(progress * Math.PI) * 0.05; // subtle drift
        camera.rotation.x = Math.sin(progress * Math.PI * 0.5) * 0.03;
      } else {
        // Lock camera in place after 10s
        camera.position.z = endZ;
        camera.rotation.y = 0.05;
        camera.rotation.x = 0.03;
      }

      // Rotate galaxy slowly
      galaxy.rotation.y += 0.0008;
      galaxy.rotation.z += 0.0002;

      // Spiral inward motion
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const x = pos[idx];
        const z = pos[idx + 2];
        const dist = Math.sqrt(x * x + z * z);
        const angle = Math.atan2(z, x) + 0.002;
        const radius = dist * 0.9994;
        pos[idx] = Math.cos(angle) * radius;
        pos[idx + 2] = Math.sin(angle) * radius;
      }
      geometry.attributes.position.needsUpdate = true;

      // Flicker glow subtly
      core.material.opacity = 0.9 + Math.sin(t * 3) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeBackgroundGalaxy;
