import { SearchedUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';
import Link from 'next/link';

type Props = {
  user: SearchedUser;
};

export default function UserCard({ user }: Props) {
  const { userid, username, image, followers, following } = user;

  // Link 태그를 사용하면 Nextjs가 자동으로 브라우저 화면에 보일때 pre-fetching을해서
  // 사용자가 빠르게 데이터를 볼수있도록 해준다.
  return (
    <Link
      className="flex items-center w-full rounded-sm border border-neutral-300 mb-4 bg-white hover:bg-neutral-50"
      href={`/user/${userid}`}
    >
      <Avatar image={image} />
      <div className="ml-2 text-neutral-500">
        <p className="text-black font-bold leading-4">{userid}</p>
        <p>{username}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
