import Navbar from "./Navbar.jsx";
import Footer from "./Footer1.jsx";
import React from "react";
import ImageSlider from "./ImageSlider.jsx";
import Card from "./Card.jsx";

function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <ImageSlider />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
