import React from "react";
import "./InternshipGallery.css";
import pic6 from "../assets/intern6.webp";
import pic7 from "../assets/intern7.webp";
import pic8 from "../assets/intern8.webp";
import pic9 from "../assets/intern9.webp";
import pic10 from "../assets/intern10.webp";

function InternshipGallery() {
  const images = [pic6, pic7, pic8, pic9, pic10];

  return (
    <div className="internship-carousel">
  <div className="carousel-track">
    {[pic6, pic7, pic8, pic9, pic10, pic6, pic7, pic8, pic9, pic10].map(
      (image, index) => (
        <img key={index} src={image} alt={`Intern ${index + 1}`} />
      )
    )}
  </div>
</div>

  );
}

export default InternshipGallery;
