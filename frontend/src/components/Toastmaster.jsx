import './Toastmaster.css';

export default function Toastmaster({ toastmaster, compact = false }) {
  if (!toastmaster?.email) {
    return null;
  }

  return (
    <section
      className={`toastmaster${compact ? ' toastmaster--compact' : ''}`}
      id="toastmaster"
      aria-label="Toastmaster"
    >
      <div className="toastmaster__header">
        {/* <h2 className="toastmaster__title">{toastmaster.heading || 'Speeches'}</h2> */}
      </div>
      <div className="toastmaster__body">
        <p className="toastmaster__message">{toastmaster.message}</p>
        <a className="toastmaster__email" href={`mailto:${toastmaster.email}`}>
          <svg
            className="toastmaster__email-icon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              d="M3.5 6.5h17v11h-17z"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m3.5 6.5 8.5 7 8.5-7"
            />
          </svg>
          {toastmaster.email}
        </a>
      </div>
    </section>
  );
}
