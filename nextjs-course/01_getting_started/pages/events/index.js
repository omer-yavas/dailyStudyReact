import Link from 'next/link';

const EventsPage = () => {
  return (
    <div>
      <h2>Events Page</h2>
      <h4>All Events</h4>
      <Link href="/events/event1">Event 1 </Link>
      <Link href="events/event2">Event 2 </Link>
      <Link href="events/event3">Event 3 </Link>
      <Link href="events/event4">Event 4 </Link>
      <Link href="events/event5">Event 5 </Link>
    </div>
  );
};

export default EventsPage;
