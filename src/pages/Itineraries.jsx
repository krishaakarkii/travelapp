import React from "react";
import "./styles/Itineraries.css";

const Itineraries = () => {
  const itineraries = [
    { id: 1, destination: "Paris", days: 3, budget: "$1500" },
    { id: 2, destination: "New York", days: 5, budget: "$2500" },
  ];

  return (
    <div className="itineraries-section">
      <h2>Saved Itineraries</h2>
      <div className="itineraries-list">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="itinerary-card">
            <h3>{itinerary.destination}</h3>
            <p>Days: {itinerary.days}</p>
            <p>Budget: {itinerary.budget}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itineraries;
