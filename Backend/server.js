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

// In-memory token cache
let spotifyToken = null;
let tokenExpiresAt = 0;

// Helper function to get a valid token
async function getSpotifyToken() {
  const currentTime = Date.now();
  if (spotifyToken && currentTime < tokenExpiresAt) {
    return spotifyToken;
  }
  const tokenUrl = "https://accounts.spotify.com/api/token";
  console.log("Requesting Spotify token...");
  try {
    const tokenResponse = await axios({
      method: 'post',
      url: tokenUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
      },
      data: 'grant_type=client_credentials'
    });
    console.log("Token received:", tokenResponse.data);
    spotifyToken = tokenResponse.data.access_token;
    tokenExpiresAt = currentTime + (tokenResponse.data.expires_in * 1000) - 60000;
    return spotifyToken;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw error; // Let the upper-level catch block handle it
  }
}



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
    // Get a valid Spotify token (refreshes automatically if needed)
    const token = await getSpotifyToken();
    const artistId = "1GB2pMPzC9ID26TpYcxcbM";

    // Fetch albums and top tracks in parallel
    const [albumsResponse, topTracksResponse] = await Promise.all([
      axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        params: {
          include_groups: 'album,single',
          market: 'US',
          limit: 6
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
        params: { market: 'US' },
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
    res.status(500).json({ error: "Error fetching Spotify data server", details: error.response?.data || error.message });

  }
});

// Catch-all route for client-side routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(buildPath, 'index.html'));
});

console.log("I am alive");
app.listen(3000, '0.0.0.0', () => console.log('Server running on port 3000'));
