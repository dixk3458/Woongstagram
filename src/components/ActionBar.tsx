import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';

type Props = {
  likes: string[];
  userName: string;
  createdAt: string;
  text?: string;
};

export default function ActionBar({ likes, userName, text, createdAt }: Props) {
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="font-bold mb-1">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'Likes' : 'Like'
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-2 mb-1">{userName}</span>
            {text}
          </p>
        )}
        <p className="text-neutral-400 mb-1">{parseDate(createdAt)}</p>
      </div>
    </>
  );
}
