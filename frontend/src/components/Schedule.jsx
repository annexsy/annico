import { useEffect, useState } from 'react';
import EventPanel from './EventPanel';
import Timeline from './Timeline';
import './Schedule.css';

export default function Schedule() {
  const [events, setEvents] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/api/schedule')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load schedule');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setEvents(data.events);
        setActiveId(data.events[0]?.id ?? null);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeEvent = events.find((event) => event.id === activeId);

  if (error) {
    return (
      <section className="schedule">
        <p className="schedule__status">Unable to load schedule</p>
      </section>
    );
  }

  if (!activeEvent) {
    return (
      <section className="schedule">
        <p className="schedule__status">Loading schedule</p>
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
          activeId={activeId}
          onSelect={setActiveId}
        />
      </div>
    </section>
  );
}
