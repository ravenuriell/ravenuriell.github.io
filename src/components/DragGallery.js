import React, { useState } from "react";
import "./DragGallery.css";

import drag1 from "../assets/drag1.webp";
import drag2 from "../assets/drag2.webp";
import drag3 from "../assets/drag3.webp";
import drag4 from "../assets/drag4.webp";
import drag5 from "../assets/drag5.webp";

function DragGallery() {
  const images = [drag1, drag2, drag3, drag4, drag5];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="drag-gallery">
      <button className="drag-btn prev" onClick={prevImage}>❮</button>

      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Drag look ${currentIndex + 1}`}
        className="drag-photo"
      />

      <button className="drag-btn next" onClick={nextImage}>❯</button>
    </div>
  );
}

export default DragGallery;
