import SearchUserBar from '@/components/Search/SearchUserBar';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search user to follow',
};

export default function SearchPage() {
  return (
    <>
      <SearchUserBar />
    </>
  );
}
