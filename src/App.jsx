import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Itineraries from "./pages/Itineraries";
import Flights from "./pages/Flights";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itinerary" element={<Itineraries />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
