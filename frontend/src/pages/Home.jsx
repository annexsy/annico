import Hero from '../components/Hero';
import Schedule from '../components/Schedule';

export default function Home({ couple, hero }) {
  return (
    <>
      <Hero couple={couple} hero={hero} />
      <Schedule />
    </>
  );
}
