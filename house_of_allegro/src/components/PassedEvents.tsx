import { useEffect, useState } from "react";

interface Props {
  title: string;
}

function EventCalendar({ title }: Props) {
  const [passedEvents, setPassedEvents] = useState<any[]>([]);

  useEffect(() => {
    // Fetch upcoming events from the server

    // Fetch passed events from the server
    const fetchPassedEvents = async () => {
      try {
        const response = await fetch(
          "https://houseofallegro.com/api/passed-events"
        );
        if (!response.ok) {
          throw new Error("Error fetching passed events");
        }
        const data = await response.json();
        setPassedEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching passed events: ", error);
      }
    };

    fetchPassedEvents();
  });

  return (
    <>
      <div className="section">
        <div className="calendar-box">
          <div className="events-container">
            <h2 className="calendar-title">
              {title}
              <div className="line" />
            </h2>
            <ul className="event-list">
              {passedEvents.length > 0 ? (
                passedEvents.slice().reverse().map((event, index) => (
                  <ul key={index}>
                    <strong className="event-header">{event.summary}</strong>
                    <br />
                    {new Date(
                      event.start.dateTime || event.start.date
                    ).toLocaleString()}
                    <br />
                    {event.location && <div>{event.location}</div>}
                    <br />
                  </ul>
                ))
              ) : (
                <p>No passed events found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventCalendar;
