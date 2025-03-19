import { useState, useEffect } from "react";
import info from './info.json';
import NavBar from "./styles/NavBar";
import Footer from "./styles/Footer";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const Music = () => {
  const [token, setToken] = useState<string | null>(null);
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  
  useEffect(() => {
    console.log("CLIENT_ID:", CLIENT_ID);
    console.log("CLIENT_SECRET:", CLIENT_SECRET);
    const fetchToken = async () => {
      try {
        const response = await fetch(TOKEN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json", // <-- Ensure JSON response
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          },
          body: new URLSearchParams({ grant_type: "client_credentials" }), // <-- Fix body format
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const artistId = "1GB2pMPzC9ID26TpYcxcbM"; // Taylor Swift's Spotify ID
    if (token) {
      fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=6`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setNewReleases(data.items));

      fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setTopTracks(data.tracks));
    }
  }, [token]);

  return (
    <>
    <NavBar 
      title={info.title} 
    />
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#171717",
        color: "white",
        padding: "20px",
      }}
    >
      

      {token ? (
        <>
          {/* Top Tracks Section */}
          <h2>House of Allegro's Top Tracks</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {topTracks.map((track) => (
              <div
                key={track.id}
                style={{
                  backgroundColor: "#1e1e1e",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={track.album.images?.[0]?.url}
                  alt={track.name}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
                  {track.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  {track.artists
                    .map((a: { name: string }) => a.name)
                    .join(", ")}
                </p>
                <audio controls style={{ width: "100%", marginTop: "10px" }}>
                  {track.preview_url ? (
                    <source src={track.preview_url} type="audio/mpeg" />
                  ) : (
                    <p style={{ fontSize: "14px", color: "#aaa" }}>
                      No preview available
                    </p>
                  )}
                </audio>
              </div>
            ))}
          </div>

          {/* New Releases Section */}
          <h2 style={{ marginTop: "40px" }}>Latest Releases</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {newReleases.map((album) => (
              <div
                key={album.id}
                style={{
                  backgroundColor: "#1e1e1e",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={album.images?.[0]?.url}
                  alt={album.name}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
                  {album.name}
                </h3>
                <p style={{ fontSize: "14px", color: "#aaa" }}>
                  Release Date: {album.release_date}
                </p>
                <a
                  href={album.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#1DB954",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Listen on Spotify
                </a>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", fontSize: "18px" }}>
          Fetching token...
        </p>
      )}
    </div>
    <Footer />
    </>
  );
};

export default Music;