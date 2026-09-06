import './Venue.css';

function toAbsoluteUrl(url) {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

export default function Venue({ venue }) {
  if (!venue) {
    return null;
  }

  return (
    <section className="venue" id="venue" aria-label="Venue">
      {/* <div className="venue__header">
        <div className="venue__rule" />
        <h2 className="venue__title">Venue</h2>
      </div> */}

      <div className="venue__details">
        <p className="venue__date">{venue.dateLabel}</p>
        <p className="venue__name">{venue.name}</p>
        {venue.address ? <p className="venue__address">{venue.address}</p> : null}
        <a
          className="venue__map"
          href={toAbsoluteUrl(venue.mapUrl)}
          target="_blank"
          rel="noreferrer"
        >
          View on Map
        </a>
        {/* <div className="venue__attire">
          <span className="venue__attire-label">Attire</span>
          <p>Cocktail attire</p>
        </div> */}
      </div>
    </section>
  );
}
