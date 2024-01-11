'use client';


import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from '../UI/Icons/PostIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import PostGrid from '../Post/PostGrid';

type Props = {
  user: ProfileUser;
};

const tabs = [
  {
    type: 'post',
    icon: <PostIcon />,
  },
  {
    type: 'saved',
    icon: <BookMarkIcon className="w-5 h-5" />,
  },
  {
    type: 'liked',
    icon: <HeartIcon className="w-5 h-5" />,
  },
];

export default function UserPosts({ user }: Props) {
  // 인자로 받은 user의 선택된 tap에 따라서 게시물을 보여주면된다.

  const { userid } = user;
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }, index) => (
          <li key={index} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid userid={userid} query={query} />
    </section>
  );
}
