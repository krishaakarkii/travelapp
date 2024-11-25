import React, { useState } from "react";
import "./styles/Flights.css";

const Flights = () => {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!destination || !budget || !date) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Searching flights to ${destination} within ${budget} on ${date}.`);
  };

  return (
    <div className="flights-section">
      <div className="flights-header">
        <h2>Find Your Flight</h2>
        <p>Search for flights within your budget and make your travel seamless.</p>
      </div>
      <div className="flight-search-form">
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSearch} className="primary-button">
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default Flights;
