import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Search',
  description: '나를 이해하는 사람들을 찾아 관심사를 공유해보세요.',
};

export default function SearchPage() {
  return (
    <>
      <UserSearch />
    </>
  );
}
