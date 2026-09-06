import { asset } from '../lib/assets';
import './Hero.css';

export default function Hero({ couple, hero, dateLabel }) {
  const names = `${couple.partnerOne} & ${couple.partnerTwo}`.toUpperCase();

  return (
    <section className="hero" aria-label="Wedding introduction">
      <div className="hero__media">
        <img src={asset(hero.image)} alt={hero.alt} className="hero__image" />
        <div className="hero__overlay" />
      </div>
      <div className="hero__subheader">
        <h1 className="hero__names">{names}</h1>
        {dateLabel ? <p className="hero__date">{dateLabel}</p> : null}
      </div>
    </section>
  );
}
