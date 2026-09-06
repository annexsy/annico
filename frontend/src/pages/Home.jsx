import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Venue from '../components/Venue';

export default function Home({ couple, hero, venue, schedule }) {
  return (
    <>
      <Hero couple={couple} hero={hero} />
      <Venue venue={venue} />
      <Schedule events={schedule} />
    </>
  );
}
