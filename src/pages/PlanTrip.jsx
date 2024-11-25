import React, { useState } from "react";
import "./styles/PlanTrip.css";

const PlanTrip = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [budget, setBudget] = useState("");

  const handleGenerate = () => {
    if (!destination || !days || !budget) {
      alert("Please fill in all fields!");
      return;
    }
    alert(
      `Generating itinerary for ${destination} for ${days} days with a budget of ${currency}${budget}.`
    );
  };

  return (
    <div className="plan-trip">
      <h2>Plan Your Trip</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a destination..."
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          <option value="">Select days</option>
          <option value="1">1 Day</option>
          <option value="2">2 Days</option>
          <option value="3">3 Days</option>
          <option value="7">1 Week</option>
        </select>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">$ USD</option>
          <option value="EUR">€ Euro</option>
          <option value="GBP">£ Pound</option>
        </select>
        <input
          type="number"
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <button onClick={handleGenerate}>Generate Itinerary</button>
      </div>
    </div>
  );
};

export default PlanTrip;
