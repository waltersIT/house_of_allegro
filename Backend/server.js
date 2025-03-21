require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CALENDAR_ID = process.env.CALENDAR_ID;

// Define the path to your React build directory
const buildPath = path.join(__dirname, '../house_of_allegro/dist');

// Serve static files from the React app build
app.use(express.static(buildPath));



// API route to fetch events from Google Calendar
app.get('/api/events', async (req, res) => {
  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMin=${timeMin}&singleEvents=true&orderBy=startTime&maxResults=10&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Catch-all route for client-side routing.
// This ensures that any request not matching /api/* returns index.html
// so React Router (or your client-side logic) can handle the route.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

console.log("I am alive");
app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
