import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import NavBar from "./styles/NavBar";
import info from './info.json';
import Footer from "./styles/Footer";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID; //not coming through but don't need it rn
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const CALENDAR_ID = import.meta.env.VITE_CALENDAR_ID; // calendar id works tho idk

interface Props {
  title: string;
}

function GoogleCalendar({ title }: Props) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const start = async () => {
      gapi.load("client", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });

        fetchEvents();
      });
    };

    start();
  }, []);

  const fetchEvents = async () => {
    const response = await gapi.client.calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 10,
    });

    setEvents(response.result.items || []);
  };

  return (
    <>
      <NavBar title={info.title} />
      <div className="section">
        <div className="calendar-box">
          <h2 className="calendar-title">
            {title}
            <div className="line"></div>
          </h2>


          <ul className="event-list">
            <div className="">
            {events.length > 0 ? (
              events.map((event, index) => (
                <ul key={index}>
                  <strong className="event-header">{event.summary}</strong>
                  
                  <br></br>

                  
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                  <br></br>
                  {event.location && (
                    <div className="">{event.location}</div>
                  )}
                  <br></br>
                </ul>
              ))
            ) : (
              <p>No upcoming events found.</p>
            )}
            </div>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default GoogleCalendar;
