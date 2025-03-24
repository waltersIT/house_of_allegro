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
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

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

// New endpoint to fetch passed events (events that have ended before now)
app.get('/api/passed-events', async (req, res) => {
  try {
    const timeMax = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?timeMax=${timeMax}&singleEvents=true&orderBy=startTime&maxResults=10&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching passed events:', error);
    res.status(500).json({ error: 'Error fetching passed events' });
  }
});

app.get('/api/spotify', async (req, res) => {
  try {
    const tokenUrl = "https://accounts.spotify.com/api/token";
    const tokenResponse = await axios({
      method: 'post',
      url: tokenUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
      },
      data: 'grant_type=client_credentials'
    });
    const token = tokenResponse.data.access_token;
    const artistId = "1GB2pMPzC9ID26TpYcxcbM";

    const [albumsResponse, topTracksResponse] = await Promise.all([
      axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        params: {
          include_groups: 'album,single',
          market: 'UK',
          limit: 6
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        params: { market: 'UK' },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);

    res.json({
      newReleases: albumsResponse.data.items,
      topTracks: topTracksResponse.data.tracks
    });
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    res.status(500).json({ error: "Error fetching Spotify data" });
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
