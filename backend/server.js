const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAyf62zo1l16I1UvvgJP7vLV5oYNfeI3ms"; // Replace with your actual API key

// Test route to ensure server is running
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

//flights
app.get("/api/flights", (req, res) => {
  const { destination, budget, date } = req.query;

  if (!destination || !budget || !date) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  // Mock flight data (replace with real API call)
  const flights = [
    { airline: "Airline A", origin: "City X", destination, price: 200, date },
    { airline: "Airline B", origin: "City Y", destination, price: 300, date },
    { airline: "Airline C", origin: "City Z", destination, price: 250, date },
  ].filter((flight) => flight.price <= parseFloat(budget));

  if (flights.length === 0) {
    return res.status(404).json({ error: "No flights found within your budget." });
  }

  res.json({ flights });
});


// Fetch places and create a dynamic itinerary
app.get("/api/itinerary", async (req, res) => {
  const { destination, days } = req.query;

  if (!destination || !days) {
    return res.status(400).json({ error: "Destination and days are required!" });
  }

  try {
    console.log("Fetching itinerary for:", { destination, days });

    // Fetch places from Google Places API
    const placesResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: `things to do in ${destination}`,
          key: API_KEY,
        },
      }
    );

    const places = placesResponse.data.results;

    // Check if results are empty
    if (!places || places.length === 0) {
      return res.status(404).json({ error: "No places found for the specified city." });
    }

    console.log("Places fetched from Google API:", places.map((place) => place.name));

    // Randomize phrases for each part of the day
    const phrases = {
      start: [
        "Begin your journey at",
        "Kick off your day with a visit to",
        "Start your adventure at",
        "Have a magnificent start at",
        "Welcome the day with a stop at",
        "Start your morning with",
        "Commence your journey at",
        "Jumpstart your day at",
        "Enjoy a fresh start at",
        "Make the most of your morning at",
      ],
      visit: [
        "Then explore",
        "Discover the beauty of",
        "Spend some time at",
        "Take a moment to enjoy",
        "Immerse yourself in",
        "Explore the wonders of",
        "Wander through",
        "Dive into the charm of",
        "Lose yourself in the magic of",
        "Roam around",
      ],
      meal: [
        "Enjoy a delicious lunch at",
        "Savor a meal at",
        "Recharge with a bite at",
        "Relish a hearty lunch at",
        "Treat yourself to a meal at",
        "Feast on flavors at",
        "Take a break and dine at",
        "Indulge in a meal at",
        "Enjoy a culinary delight at",
        "Grab a delicious bite at",
      ],
      end: [
        "Conclude your day at",
        "Wind down with a visit to",
        "End your evening at",
        "Wrap up your adventure at",
        "Finish your day by exploring",
        "End on a high note at",
        "Say farewell to the day at",
        "Relax and unwind at",
        "End your journey at",
        "Close the day with a visit to",
      ],
    };

    // Generate daily itineraries with dynamic descriptions
    const dailyItinerary = [];
    for (let i = 0; i < days; i++) {
      const shuffled = places.sort(() => 0.5 - Math.random());
      const dayPlan = shuffled.slice(0, 4); // Select up to 4 places per day

      const dayDescription = [];
      if (dayPlan[0]) {
        dayDescription.push(
          `${phrases.start[Math.floor(Math.random() * phrases.start.length)]} <span class="highlight">${dayPlan[0].name}</span>.`
        );
      }
      if (dayPlan[1]) {
        dayDescription.push(
          `${phrases.visit[Math.floor(Math.random() * phrases.visit.length)]} <span class="highlight">${dayPlan[1].name}</span>.`
        );
      }
      if (dayPlan[2]) {
        dayDescription.push(
          `${phrases.meal[Math.floor(Math.random() * phrases.meal.length)]} <span class="highlight">${dayPlan[2].name}</span>.`
        );
      }
      if (dayPlan[3]) {
        dayDescription.push(
          `${phrases.end[Math.floor(Math.random() * phrases.end.length)]} <span class="highlight">${dayPlan[3].name}</span>.`
        );
      }

      dailyItinerary.push({
        day: i + 1,
        description: dayDescription.join(" "),
      });
    }

    if (dailyItinerary.length === 0) {
      return res
        .status(404)
        .json({ error: "Not enough places to generate an itinerary." });
    }

    res.json(dailyItinerary);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ error: "Failed to fetch itinerary." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
