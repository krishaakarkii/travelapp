import React, { useState, useEffect, useRef } from "react";
import "./styles/HomePage.css";
import PlanTrip from "./PlanTrip";
import Flights from "./Flights";
import About from "./About";
import DestinationDetails from "./DestinationDetails"; // New Component

import beachImage from "/src/assets/beach.jpg";
import sunsetImage from "/src/assets/sunset.jpg";
import desertImage from "/src/assets/desert.jpg";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [loading, setLoading] = useState(false);

  const images = [desertImage, sunsetImage, beachImage];
  const planTripRef = useRef(null);
  const flightsRef = useRef(null);
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

  const handleViewDetails = async (destination, days) => {
    setLoading(true);
    setSelectedDestination(destination);

    try {
      const response = await fetch(
        `http://localhost:4000/api/itinerary?destination=${destination}&days=${days}`
      );
      const data = await response.json();
      setItinerary(data);
    } catch (error) {
      console.error("Failed to fetch itinerary:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-links">
          <button onClick={() => scrollToSection(planTripRef)}>Plan Trip</button>
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
          {[
            { name: "Tokyo", image: "/src/assets/Tokyo.jpg", days: 3 },
            { name: "Paris", image: "/src/assets/paris.jpg", days: 7 },
            { name: "New York", image: "/src/assets/Newyork.webp", days: 5 },
          ].map((destination) => (
            <div key={destination.name} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <h3>{`A Perfect ${destination.days}-Day Trip to ${destination.name}`}</h3>
              <p>Explore the unique experiences of {destination.name}.</p>
              <button
                className="primary-button"
                onClick={() => handleViewDetails(destination.name, destination.days)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Details Section */}
      {selectedDestination && (
        <div className="destination-details">
          <DestinationDetails
            destination={selectedDestination}
            itinerary={itinerary}
            loading={loading}
          />
        </div>
      )}

      {/* Plan Trip Section */}
      <div ref={planTripRef} id="plan-trip">
        <PlanTrip />
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
