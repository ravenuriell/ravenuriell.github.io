import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

const ThreeBackground = forwardRef((props, ref) => {
  const mountRef = useRef(null);
  const ripples = useRef([]);
  const zooming = useRef(false);      // flag to trigger zoom
  const zoomSpeed = 0.1;              // faster zoom

  useImperativeHandle(ref, () => ({
    triggerRipple: (x, y) => {
      const vector = new THREE.Vector3(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1,
        0
      );
      ripples.current.push({ origin: vector.clone(), time: 0 });
    },
    triggerZoom: () => {
      zooming.current = true;          // start zoom animation
    },
  }));

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);
    currentMount.appendChild(renderer.domElement);

    const particleCount = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      velocities.push(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002
      );
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      sizeAttenuation: true,
      map: new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/sprites/circle.png"
      ),
      alphaTest: 0.5,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let autoRotationY = 0;
    let autoRotationX = 0;
    const mouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
      if (!zooming.current) { // ignore mouse while zooming
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);

      if (!zooming.current) {
        autoRotationY += 0.0008;
        autoRotationX += 0.0004;
        points.rotation.y = autoRotationY + mouse.x * 0.5;
        points.rotation.x = autoRotationX + mouse.y * 0.5;
      }

      const pos = geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i * 3];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        pos[i * 3 + 2] += velocities[i * 3 + 2];

        for (let j = 0; j < 3; j++) {
          if (pos[i * 3 + j] > 10) pos[i * 3 + j] = -10;
          if (pos[i * 3 + j] < -10) pos[i * 3 + j] = 10;
        }

        ripples.current.forEach((r) => {
          const dx = pos[i * 3] - r.origin.x * 10;
          const dy = pos[i * 3 + 1] - r.origin.y * 10;
          const dz = pos[i * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const rippleEffect = Math.exp(-dist * dist * 3) * 0.5 * (1 - r.time);
          pos[i * 3] += dx * rippleEffect;
          pos[i * 3 + 1] += dy * rippleEffect;
        });
      }

      ripples.current = ripples.current
        .map((r) => ({ ...r, time: r.time + 0.01 }))
        .filter((r) => r.time <= 1);

      // Camera zoom
      if (zooming.current) {
        camera.position.z -= zoomSpeed;
        if (camera.position.z <= 1) zooming.current = false;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
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
});

export default ThreeBackground;
