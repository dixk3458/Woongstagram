import { useState } from 'react';
import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import formatDate from '@/utils/date';
import ToggleButton from '../UI/Button/ToggleButton';
import HeartFillIcon from '../UI/Icons/HeartFillIcon';
import BookMarkFillIcon from '../UI/Icons/BookMarkFillIcon';
import { SimplePost } from '@/model/post';
import { getSession, useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import usePosts from '@/hook/usePosts';

type Props = {
  post: SimplePost;
};

// boolean값에 따라서 토글을 할수있는 ToggleButton 컴포넌트를 만들어 재사용해볼것이다.

export default function ActionBar({ post }: Props) {
  const { id: postid, userid, likes, text, createdAt } = post;
  // mount될때 false로 지정하지 말고
  // post의 likes배열에 사용자의 Id가 있는지 없는지에 따라서 상태를 설정할것이다.
  const { data: session } = useSession();
  const user = session?.user;

  // const [liked, setLiked] = useState(
  //   user ? likes.includes(user.userid) : false
  // );
  // 컴포넌트 내부 상태에 의존해서 liked인지 아닌지를 결정하는것이아니라
  // mutate로 매번 post를 받아오는데, 그 post의 likes 배열안에
  // 사용자가 들어있는지에 따라서 결정

  const liked = user ? likes.includes(user.userid) : false;

  const [bookmarked, setBookmarked] = useState(false);

  // 내부적으로 stale된 데이터를 사용하는것을 방지하도록

  // 나중에 클릭이 되면, handleLike()를 해줘
  // handleLike()는 boolean 타입을 인자로해서 그걸로 setLike하는거야
  // liked에는 toggeld로 전달된 값을 쓰면돼

  const { setLike } = usePosts();

  const handleLike = (liked: boolean) => {
    if (user) {
      setLike(post, user.usertokenid, liked);
    }
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={liked => handleLike(liked)}
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
