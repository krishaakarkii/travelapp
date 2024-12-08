import React, { useState } from "react";
import "./styles/DestinationDetails.css";

const DestinationDetails = ({ destination, itinerary, loading }) => {
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div className="destination-details-container">
      <h2>{`Explore ${destination}`}</h2>
      {loading ? (
        <p>Loading itinerary...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default DestinationDetails;
