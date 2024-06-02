import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';

type Props = {
  post: SimplePost;
};

export default function PostListCard({ post }: Props) {
  const { userImage, userName, image, likes, text, createdAt } = post;
  return (
    <>
      <div>
        <Avatar image={userImage} highlight={true} size="normal" />
        <span>{userName}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${userName}`}
        width={500}
        height={500}
      />
      <div>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'Likes' : 'Like'}`}</p>
        <p>
          <span>{userName}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
      </div>
      <form>
        <input type="text" />
        <button>POST</button>
      </form>
    </>
  );
}
