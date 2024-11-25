const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to fetch places from Google Places API
app.get("/api/places", async (req, res) => {
  const { destination } = req.query;

  if (!destination) {
    return res.status(400).json({ error: "Destination is required" });
  }

  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json", {
      params: {
        query: `things to do in ${destination}`,
        key: "AIzaSyAyf62zo1l16I1UvvgJP7vLV5oYNfeI3ms", // Replace with your key
      },
    });
    const places = response.data.results.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      photo: place.photos ? place.photos[0].photo_reference : null,
      place_id: place.place_id,
    }));
    res.json(places);
  } catch (error) {
    console.error("Error fetching data from Google Places API:", error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
