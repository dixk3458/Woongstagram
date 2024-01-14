import { useState } from 'react';
import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import formatDate from '@/utils/date';
import ToggleButton from '../UI/Button/ToggleButton';
import HeartFillIcon from '../UI/Icons/HeartFillIcon';
import BookMarkFillIcon from '../UI/Icons/BookMarkFillIcon';

type Props = {
  likes: string[];
  userid: string;
  createdAt: string;
  text?: string;
};

// boolean값에 따라서 토글을 할수있는 ToggleButton 컴포넌트를 만들어 재사용해볼것이다.

export default function ActionBar({ likes, userid, text, createdAt }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={liked => setLiked(liked)}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={bookmarked => setBookmarked(bookmarked)}
          onIcon={<BookMarkFillIcon />}
          offIcon={<BookMarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-1">{userid}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {formatDate(createdAt)}
        </p>
      </div>
    </>
  );
}
