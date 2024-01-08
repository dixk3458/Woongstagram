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
    <>
      <div>
        <Avatar image={userimage} highlight />
        <span>{userid}</span>
      </div>
      <Image src={photo} alt={`photo by ${userid}`} width={500} height={500} />
      <div>
        <HeartIcon />
        <BookMarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
      </div>
      <div>
        <p>
          <span>{userid}</span>
          {text}
        </p>
        <p>{formatDate(createdAt)}</p>
        <form>
          <SmileIcon />
          <input type="text" placeholder="Add a comment..." />
        </form>
      </div>
    </>
  );
}
