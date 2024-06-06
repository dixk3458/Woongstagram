import Link from 'next/link';
import Avatar from '../Avatar';

type Props = {
  image: string;
  userName: string;
};

export default function PostUserAvatar({ image, userName }: Props) {
  return (
    <div className="flex items-center p-4">
      <Avatar image={image} highlight={true} size="medium" />
      <Link href={`/user/${userName}`} className="font-bold ml-4 text-gray-800">
        {userName}
      </Link>
    </div>
  );
}
