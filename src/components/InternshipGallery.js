import React from "react";
import "./InternshipGallery.css";
import pic1 from "../assets/intern1.webp";
import pic2 from "../assets/intern2.webp";
import pic3 from "../assets/intern3.webp";
import pic4 from "../assets/intern4.webp";
import pic5 from "../assets/intern5.webp";

function InternshipGallery() {
  const images = [pic1, pic2, pic3, pic4, pic5];

  return (
    <div className="internship-carousel">
  <div className="carousel-track">
    {[pic1, pic2, pic3, pic4, pic5, pic1, pic2, pic3, pic4, pic5].map(
      (image, index) => (
        <img key={index} src={image} alt={`Intern ${index + 1}`} />
      )
    )}
  </div>
</div>

  );
}

export default InternshipGallery;
