import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';
import Link from 'next/link';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, userName, image, likes, text, createdAt } = post;
  return (
    <article className="rounded-lg border border-neutral-200 shadow-md overflow-hidden">
      <div className="flex items-center p-4">
        <Avatar image={userImage} highlight={true} size="medium" />
        <Link
          href={`/user/${userName}`}
          className="font-bold ml-4 text-gray-800"
        >
          {userName}
        </Link>
      </div>
      <Image
        src={image}
        alt={`photo by ${userName}`}
        width={500}
        height={500}
        className="w-full object-cover aspect-square"
      />
      <div className="flex justify-between px-4 py-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="font-bold mb-1">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'Likes' : 'Like'
        }`}</p>
        <p>
          <span className="font-bold mr-2 mb-1">{userName}</span>
          {text}
        </p>
        <p className="text-neutral-400 mb-1">{parseDate(createdAt)}</p>
      </div>
      <form className="flex border-t">
        <input
          type="text"
          className="grow border-none outline-none py-2 px-4"
        />
        <button className="bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 font-bold p-2">
          POST
        </button>
      </form>
    </article>
  );
}
