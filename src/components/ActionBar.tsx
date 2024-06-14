import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icon/HeartFillIcon';
import BookmarkFillIcon from './ui/icon/BookmarkFillIcon';

type Props = {
  likes: string[];
  userName: string;
  createdAt: string;
  text?: string;
};

export default function ActionBar({ likes, userName, text, createdAt }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <ToggleButton
          toggled={liked}
          onToggle={toggled => setLiked(toggled)}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={toggled => setBookmarked(toggled)}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
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
