import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h2>Starting Page</h2>
      <h4>Featured Events</h4>
      <button>Event 4 </button>
      <button>Event 5 </button>
      <Link href="/events">Hepsini Gör </Link>
    </div>
  );
};

export default HomePage;
