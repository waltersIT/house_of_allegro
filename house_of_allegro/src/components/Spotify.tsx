import { useState, useEffect } from "react";
import info from './info.json';
import NavBar from "./styles/NavBar";
import Footer from "./styles/Footer";

const Music = () => {
  const [newReleases, setNewReleases] = useState<any[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewReleases(data.newReleases);
        setTopTracks(data.topTracks);
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    fetchSpotifyData();
  }, []);

  return (
    <>
      <NavBar title={info.title} />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#171717",
          color: "white",
          padding: "20px",
        }}
      >
        {(newReleases.length || topTracks.length) ? (
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
                    {track.artists.map((a: { name: string }) => a.name).join(", ")}
                  </p>
                  {/*
                  <audio controls style={{ width: "100%", marginTop: "10px" }}>
                    {track.preview_url ? (
                      <source src={track.preview_url} type="audio/mpeg" />
                    ) : (
                      <p style={{ fontSize: "14px", color: "#aaa" }}>
                        No preview available
                      </p>
                    )}
                  </audio>
                  */}
                  <a
                    href={track.external_urls?.spotify || track.album.external_urls.spotify}
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
                  <p style={{ fontSize: "12px", color: "#aaa", marginTop: "5px" }}>
                    Music and metadata supplied and made available by{" "}
                    <a
                      href="https://www.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1DB954", textDecoration: "none" }}
                    >
                      Spotify
                    </a>
                    .
                  </p>
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
                  <p style={{ fontSize: "12px", color: "#aaa", marginTop: "5px" }}>
                    Music and metadata supplied and made available by{" "}
                    <a
                      href="https://www.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#1DB954", textDecoration: "none" }}
                    >
                      Spotify
                    </a>
                    .
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Loading Spotify data...
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Music;
