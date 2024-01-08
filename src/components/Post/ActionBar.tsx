import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import formatDate from '@/utils/date';

type Props = {
  likes: string[];
  userid: string;
  text: string;
  createdAt: string;
};

export default function ActionBar({ likes, userid, text, createdAt }: Props) {
  return (
    <>
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
      </div>
    </>
  );
}
