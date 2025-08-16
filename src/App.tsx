import { useState } from "react";
import Day from "./Components/Day";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
}

const App = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Update event in state
  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  // Days of the week, 0=Today, 1=Tomorrow, etc.
  const days = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div>
      <h1>My Calendar App</h1>

      {/* Add Event Button */}
      <button
        onClick={() =>
          setEvents([
            ...events,
            { id: events.length + 1, title: "New Event", date: new Date() },
          ])
        }
      >
        Add Event
      </button>

      {/* Render days */}
      {days.map((dayIndex) => {
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() + dayIndex);
        return (
          <Day
            key={dayIndex}
            events={events}
            date={dayDate}
            onUpdateEvent={handleUpdateEvent}
          />
        );
      })}
    </div>
  );
};

export default App;
