import { useState } from "react";
import { useEffect } from "react";
import Day from "./Components/Day";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
}

const App = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    //Get events from local storage or return empty array if it doesnt exist
    const stored = localStorage.getItem("Events");
    if (!stored) return [];
    return JSON.parse(stored).map((ev: any) => ({
      ...ev,
      date: new Date(ev.date), // Convert dates back into Date() Objects
    }));
  });

  //Saves events to lcoal storage
  useEffect(() => {
    localStorage.setItem("Events", JSON.stringify(events));
  }, [events]);

  // Update event in state using the events array in local storage
  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
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
