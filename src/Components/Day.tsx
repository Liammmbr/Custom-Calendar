import React from "react";

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
}

interface DayProps {
  events: CalendarEvent[];
  date: Date;
  onUpdateEvent: (event: CalendarEvent) => void;
}

const Day = ({ events, date, onUpdateEvent }: DayProps) => {
  return (
    <div>
      <h2>{date.toLocaleDateString()}</h2>
      <ul>
        {events
          .filter((event) => event.date.toDateString() === date.toDateString())
          .map((event, index) => (
            <li key={index}>
              <form>
                {/* Title */}
                <input
                  type="text"
                  defaultValue={event.title}
                  onChange={(e) =>
                    onUpdateEvent({
                      ...event,
                      title: e.target.value,
                    })
                  }
                />

                {/* Date */}
                <input
                  type="date"
                  defaultValue={event.date.toISOString().slice(0, 10)}
                  onChange={(e) =>
                    onUpdateEvent({
                      ...event,
                      date: new Date(
                        e.target.value + "T" + event.date.toTimeString()
                      ),
                    })
                  }
                />

                {/* Time */}
                <input
                  type="time"
                  defaultValue={event.date.toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/New_York", // EST/EDT
                  })}
                  onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":");
                    const newDate = new Date(event.date);
                    newDate.setHours(parseInt(hours));
                    newDate.setMinutes(parseInt(minutes));
                    onUpdateEvent({
                      ...event,
                      date: newDate,
                    });
                  }}
                />
              </form>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Day;
