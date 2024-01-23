'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from '../UI/Icons/PostIcon';
import HeartIcon from '../UI/Icons/HeartIcon';
import BookMarkIcon from '../UI/Icons/BookMarkIcon';
import PostGrid from '../Post/PostGrid';
import { CacheKeysContext } from '@/context/CacheKeysContext';

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
      <ul className="flex justify-center items-center uppercase ">
        {tabs.map(({ type, icon }, index) => (
          <li
            className={`flex items-center mx-12 py-4 cursor-pointer ${
              query === type && 'font-bold border-t border-black'
            }`}
            key={index}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline md:ml-1">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/user/${userid}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
