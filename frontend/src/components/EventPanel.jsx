import './EventPanel.css';

export default function EventPanel({ event }) {
  return (
    <article className="event-panel">
      <div className="event-panel__image-wrap">
        <img
          src={event.image}
          alt=""
          className="event-panel__image"
        />
      </div>

      <div className="event-panel__body">
        <h3 className="event-panel__title">{event.title}</h3>
        <p className="event-panel__description">{event.description}</p>
      </div>

      <div className="event-panel__meta">
        <p className="event-panel__venue">
          {event.venue}
          {event.address ? (
            <>
              <br />
              {event.address}
            </>
          ) : null}
        </p>
        <p className="event-panel__datetime">
          {event.dateLabel}
          <br />
          {event.timeLabel}
        </p>
        <a
          className="event-panel__map"
          href={event.mapUrl}
          target="_blank"
          rel="noreferrer"
        >
          View on Map
        </a>
        <div className="event-panel__attire">
          <span className="event-panel__attire-label">Attire</span>
          <p>{event.attire}</p>
        </div>
      </div>
    </article>
  );
}
