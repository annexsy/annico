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
      <div className="venue__details">
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
      </div>
    </section>
  );
}
