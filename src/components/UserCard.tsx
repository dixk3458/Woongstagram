import { ProfileUser } from '@/model/user';
import Link from 'next/link';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};
export default function UserCard({
  user: { userName, name, image, following, followers },
}: Props) {
  return (
    <Link
      href={`/user/${userName}`}
      className="bg-white flex border border-gray-300 p-4 hover:bg-neutral-50"
    >
      <Avatar image={image} />
      <div className="ml-4 text-neutral-500">
        <p className="font-bold text-black leading-4">{userName}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}
