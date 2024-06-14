import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icon/HeartFillIcon';
import BookmarkFillIcon from './ui/icon/BookmarkFillIcon';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id: postId, likes, userName, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;

  const { mutate } = useSWRConfig();

  const liked = user ? likes.includes(user.userName) : false;
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = (liked: boolean) => {
    fetch('/api/like', {
      method: 'PUT',
      body: JSON.stringify({
        postId: postId,
        liked: liked,
      }),
    }).then(() => mutate('/api/posts'));
  };
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <ToggleButton
          toggled={liked}
          onToggle={liked => handleLike(liked)}
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
