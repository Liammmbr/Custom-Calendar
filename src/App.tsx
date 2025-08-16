import { useState } from "react";
import Event from "./Components/Event";

function App() {
  const [events, setEvents] = useState<object[]>([]);

  function createEvent() {
    setEvents([...events, {}]);
  }

  return (
    <div>
      <h1>My Calendar App</h1>
      <button onClick={createEvent}>Add Event</button>

      {events.map((event, index) => (
        <Event key={index} />
      ))}
    </div>
  );
}

export default App;
