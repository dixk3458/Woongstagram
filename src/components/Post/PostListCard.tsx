import { SimplePost } from '@/model/post';
import Avatar from '../Avatar/Avatar';
import Image from 'next/image';
import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import formatDate from '@/utils/date';
import SmileIcon from '../UI/Icons/SmileIcon';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userimage, userid, photo, likes, text, createdAt } = post;
  return (
    <article className="rounded-lg shadow-md border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userimage} size="medium" highlight />
        <span className="text-gray-700 font-bold ml-2">{userid}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={photo}
        alt={`photo by ${userid}`}
        width={500}
        height={500}
      />
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookMarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        <p>
          <span className="font-bold mr-1">{userid}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {formatDate(createdAt)}
        </p>
        <form className="flex  items-center border-t border-neutral-300">
          <SmileIcon />
          <input
            className="w-full ml-2 p-3 border-none outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button className='font-bold text-orange-500 ml-2'>Post</button>
        </form>
      </div>
    </article>
  );
}
