import { useEffect, useState } from "react";

interface Props {
  title: string;
}

function Events({ title }: Props) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //tried apitest/api/events
        //tried just api test
        //tried just the base url
        const response = await fetch("https://houseofallegro.com/api/events");
        const data = await response.json();
        // Google Calendar API returns events in data.items
        setEvents(data.items || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="section">
        <div className="calendar-box">
          <div className="events-container">
            <h2 className="calendar-title">
              {title}
              <div className="line"></div>
            </h2>

            <ul className="event-list">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <ul key={index}>
                    <strong className="event-header">{event.summary}</strong>

                    <br></br>

                    {new Date(
                      event.start.dateTime || event.start.date
                    ).toLocaleString()}
                    <br></br>
                    {event.location && <div className="">{event.location}</div>}
                    <br></br>
                  </ul>
                ))
              ) : (
                <p>No upcoming events found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
