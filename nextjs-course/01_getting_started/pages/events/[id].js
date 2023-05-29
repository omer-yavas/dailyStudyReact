import { useRouter } from 'next/router';
import Link from 'next/link';

const SpecialEventPage = () => {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h2>Event Detail Page</h2>
      <h2>Page of {router.query.id}</h2>

      <Link href="/">Ana Sayfa </Link>
    </div>
  );
};

export default SpecialEventPage;
