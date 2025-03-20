import { useEffect, useState } from "react";


interface Props {
  title: string;
}

function ApiTest({ title }: Props) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //tried apitest/api/events
        //tried just api test
        //tried just the base url
        const response = await fetch("http://3.83.64.73:3000/api/events");
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
    <div className="section">
      <div className="calendar-box">
        <h2 className="calendar-title">
          {title}
          <div className="line"></div>
        </h2>
        <ul className="event-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <li key={index}>
                <strong className="event-header">{event.summary}</strong>
                <br />
                {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                <br />
                {event.location && <div>{event.location}</div>}
                <br />
              </li>
            ))
          ) : (
            <p>No upcoming events found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ApiTest;
