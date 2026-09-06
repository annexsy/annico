import { asset } from '../lib/assets';
import './EventPanel.css';

export default function EventPanel({ event }) {
  return (
    <article className="event-panel">
      <div className="event-panel__image-wrap">
        <img
          src={asset(event.image)}
          alt=""
          className="event-panel__image"
        />
      </div>

      <div className="event-panel__body">
        <h3 className="event-panel__title">{event.title}</h3>
        <p className="event-panel__time">Starts at {event.timeLabel}</p>
        <p className="event-panel__description">{event.description}</p>
      </div>
    </article>
  );
}
