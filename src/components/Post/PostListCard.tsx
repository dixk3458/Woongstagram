import { SimplePost } from '@/model/post';
import Avatar from '../Avatar/Avatar';
import Image from 'next/image';

import CommentForm from './CommentForm';
import ActionBar from './ActionBar';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
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
        priority={priority}
      />
      <ActionBar
        likes={likes}
        userid={userid}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
