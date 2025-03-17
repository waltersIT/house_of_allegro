import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import NavBar from "./styles/NavBar";
import info from "./info.json";
import Footer from "./styles/Footer";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID;
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

interface Props {
  title: string;
}

function EventCalendar({ title }: Props) {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [passedEvents, setPassedEvents] = useState<any[]>([]);

  useEffect(() => {
    const start = async () => {
      gapi.load("client", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });
        // Fetch events once the client is initialized
        fetchUpcomingEvents();
        fetchPassedEvents();
      });
    };

    start();
  }, []);

  // Fetch upcoming events (events with a start time in the future)
  const fetchUpcomingEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 10,
      });
      setUpcomingEvents(response.result.items || []);
    } catch (error) {
      console.error("Error fetching upcoming events: ", error);
    }
  };

  // Fetch passed events (events that ended before now)
  const fetchPassedEvents = async () => {
    try {
      const response = await gapi.client.calendar.events.list({
        calendarId: CALENDAR_ID,
        timeMax: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 10,
      });
      setPassedEvents(response.result.items || []);
    } catch (error) {
      console.error("Error fetching passed events: ", error);
    }
  };

  return (
    <>
      
      <div className="section">
        <div className="calendar-box">
          <h2 className="calendar-title">
            {title}
            <div className="line"></div>
          </h2>
          <div className="event-lists">
            {/* Upcoming Events */}
            <div className="upcoming-events">
              <h3>Upcoming Events</h3>
              {upcomingEvents.length > 0 ? (
                <ul className="event-list">
                  {upcomingEvents.map((event, index) => (
                    <li key={index}>
                      <strong className="event-header">{event.summary}</strong>
                      <br />
                      {new Date(
                        event.start.dateTime || event.start.date
                      ).toLocaleString()}
                      <br />
                      {event.location && <div>{event.location}</div>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No upcoming events found.</p>
              )}
            </div>

            {/* Passed Events */}
            <div className="passed-events">
              <h3>Passed Events</h3>
              {passedEvents.length > 0 ? (
                <ul className="event-list">
                  {passedEvents.map((event, index) => (
                    <li key={index}>
                      <strong className="event-header">{event.summary}</strong>
                      <br />
                      {new Date(
                        event.start.dateTime || event.start.date
                      ).toLocaleString()}
                      <br />
                      {event.location && <div>{event.location}</div>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No passed events found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCalendar;
