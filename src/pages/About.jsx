import React from "react";
import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section">
      <div className="about-header">
        <h2>About TravelApp</h2>
        <p>
          TravelApp helps you plan your dream trips by providing personalized
          itineraries, flights, and hotel options. Input your destination,
          duration, and budget, and let us handle the rest!
        </p>
      </div>
      <div className="about-how-it-works">
        <h3>How It Works</h3>
        <ul>
          <li>Search for your destination.</li>
          <li>Select the number of days.</li>
          <li>Get a complete itinerary, including resturants to dine in, tourist attractions and activities.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
