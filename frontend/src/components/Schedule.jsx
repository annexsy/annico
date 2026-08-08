import { useState } from 'react';
import EventPanel from './EventPanel';
import Timeline from './Timeline';
import './Schedule.css';

export default function Schedule({ events = [] }) {
  const [activeId, setActiveId] = useState(events[0]?.id ?? null);
  const activeEvent = events.find((event) => event.id === activeId) ?? events[0];

  if (!activeEvent) {
    return (
      <section className="schedule">
        <p className="schedule__status">No schedule events yet</p>
      </section>
    );
  }

  return (
    <section className="schedule" id="schedule">
      <div className="schedule__header">
        <div className="schedule__rule" />
        <h2 className="schedule__title">Schedule</h2>
      </div>

      <div className="schedule__content">
        <EventPanel key={activeEvent.id} event={activeEvent} />
        <Timeline
          events={events}
          activeId={activeEvent.id}
          onSelect={setActiveId}
        />
      </div>
    </section>
  );
}
