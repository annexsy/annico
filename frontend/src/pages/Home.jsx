import Hero from '../components/Hero';
import Schedule from '../components/Schedule';
import Toastmaster from '../components/Toastmaster';
import Venue from '../components/Venue';

export default function Home({ couple, hero, venue, schedule, toastmaster }) {
  return (
    <>
      <Hero couple={couple} hero={hero} dateLabel={venue?.dateLabel} />
      <Venue venue={venue} />
      <Schedule events={schedule} />
      {/* <Toastmaster toastmaster={toastmaster} /> */}
    </>
  );
}
