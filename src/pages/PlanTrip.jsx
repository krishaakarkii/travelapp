import React, { useState } from "react";
import "./styles/PlanTrip.css";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState([]);
  const [error, setError] = useState("");
  const [selectedDay, setSelectedDay] = useState(1);

  const fetchItinerary = async () => {
    if (!destination || !days) {
      alert("Please provide a valid city and number of days!");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const response = await fetch(
        `http://localhost:4000/api/itinerary?destination=${destination}&days=${days}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setItinerary(data);
      setSelectedDay(1); // Reset to Day 1
    } catch (error) {
      setError("Failed to fetch itinerary. Please try again.");
    }
  };

  return (
    <div className="plan-trip">
      <h2>Plan Your Trip</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a city"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
        <button onClick={fetchItinerary}>Generate Itinerary</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {itinerary.length > 0 && (
        <div className="itinerary-section">
          {/* Navigation Tabs */}
          <div className="itinerary-tabs">
            {itinerary.map((day) => (
              <button
                key={day.day}
                className={`tab-button ${selectedDay === day.day ? "active" : ""}`}
                onClick={() => setSelectedDay(day.day)}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Display Selected Day's Itinerary */}
          <div className="itinerary-content">
            {itinerary
              .filter((day) => day.day === selectedDay)
              .map((day) => (
                <div key={day.day}>
                  <h3>Day {day.day}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: day.description,
                    }}
                  ></p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
