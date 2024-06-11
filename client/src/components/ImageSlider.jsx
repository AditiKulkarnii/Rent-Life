import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/images/main1.png";
import img2 from "../assets/images/main2.png";
import img3 from "../assets/images/main3..png";

const ImageSlider = () => {
  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000} 
    >
      <div>
        <img
          src={img1}
          alt="Image 1"
        />
      </div>
      <div>
        <img
          src={img2}
          alt="Image 2"
        />
      </div>
      <div>
        <img
          src={img3}
          alt="Image 3"
        />
      </div>
      {/* Add more images as needed */}
    </Carousel>
  );
};

export default ImageSlider;