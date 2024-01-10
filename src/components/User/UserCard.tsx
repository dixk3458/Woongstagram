import { SearchedUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';
import Link from 'next/link';

type Props = {
  user: SearchedUser;
};

export default function UserCard({ user }: Props) {
  console.log(user);
  const { userid, username, userimage, followers, following } = user;

  // Link 태그를 사용하면 Nextjs가 자동으로 브라우저 화면에 보일때 pre-fetching을해서
  // 사용자가 빠르게 데이터를 볼수있도록 해준다.
  return (
    <Link href={`/user/${userid}`}>
      <Avatar image={userimage} size="small" />
      <div>
        <p>{userid}</p>
        <p>{username}</p>
        <p>{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
