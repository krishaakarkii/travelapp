import React, { useState, useEffect, useRef } from "react";
import "./styles/HomePage.css";
import PlanTrip from "./PlanTrip";
import Itineraries from "./Itineraries";
import Flights from "./Flights";
import About from "./About";
import beachImage from "/src/assets/beach.jpg";
import sunsetImage from "/src/assets/sunset.jpg";
import desertImage from "/src/assets/desert.jpg";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [desertImage, sunsetImage, beachImage];
  const planTripRef = useRef(null);
  const flightsRef = useRef(null);
  const itinerariesRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <div className="navbar">

        <div className="navbar-links">
          <button onClick={() => scrollToSection(planTripRef)}>Plan Trip</button>
          <button onClick={() => scrollToSection(itinerariesRef)}>Itinerary</button>
          <button onClick={() => scrollToSection(flightsRef)}>Flights</button>
          <button onClick={() => scrollToSection(aboutRef)}>About</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Plan Your Perfect Getaway</h1>
          <p>
            Discover amazing destinations and create personalized itineraries to
            make your travel seamless.
          </p>
          <button
            className="primary-button"
            onClick={() => scrollToSection(planTripRef)}
          >
            Start Trip
          </button>
        </div>
        <div className="hero-slideshow">
          <div className="slideshow-images">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index + 1}`}
                className={index === currentIndex ? "active" : ""}
              />
            ))}
          </div>
          <div className="slideshow-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="featured-destinations">
        <h2>Explore Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src="/src/assets/Tokyo.jpg" alt="Tokyo" />
            <h3>A Perfect 3-Day Trip to Tokyo</h3>
            <p>Explore the vibrant culture, food, and technology of Tokyo.</p>
            <button className="primary-button">View Details</button>
          </div>
          <div className="destination-card">
            <img src="/src/assets/paris.jpg" alt="Paris" />
            <h3>A One-Week Trip to Paris</h3>
            <p>Discover the romance, history, and landmarks of Paris.</p>
            <button className="primary-button">View Details</button>
          </div>
          <div className="destination-card">
            <img src="/src/assets/Newyork.webp" alt="Maldives" />
            <h3>A five day Getaway to NewYork</h3>
            <p>Feel the pulse of the city that never sleeps.</p>
            <button className="primary-button">View Details</button>
          </div>
        </div>
      </div>

      {/* Plan Trip Section */}
      <div ref={planTripRef} id="plan-trip">
        <PlanTrip />
      </div>

      {/* Itineraries Section */}
      <div ref={itinerariesRef} id="itineraries">
        <Itineraries />
      </div>

      {/* Flights Section */}
      <div ref={flightsRef} id="flights">
        <Flights />
      </div>

      {/* About Section */}
      <div ref={aboutRef} id="about">
        <About />
      </div>
    </div>
  );
};

export default HomePage;
