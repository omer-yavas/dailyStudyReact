import { useRouter } from 'next/router';
import Link from 'next/link';

const FilteredEventPage = () => {
  const router = useRouter();
  console.log(router.query.slug);

  return (
    <div>
      <h2>Filtered Events Page</h2>
      {router.query.slug ? (
        <div>
          Page of {router.query.slug[0]}/{router.query.slug[1]}
        </div>
      ) : null}
      <Link href="/">Ana Sayfa </Link>
    </div>
  );
};

export default FilteredEventPage;
