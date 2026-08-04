import './Timeline.css';

export default function Timeline({ events, activeId, onSelect }) {
  return (
    <div className="timeline" role="tablist" aria-label="Wedding schedule">
      <div className="timeline__track" aria-hidden="true" />
      <ul className="timeline__nodes">
        {events.map((event) => {
          const isActive = event.id === activeId;
          return (
            <li key={event.id} className="timeline__node">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`timeline__button${isActive ? ' timeline__button--active' : ''}`}
                onClick={() => onSelect(event.id)}
              >
                <span className="timeline__dot" />
                <span className="timeline__label">
                  <span className="timeline__title">{event.title}</span>
                  <span className="timeline__when">
                    {event.dayLabel}, {event.timeLabel}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
