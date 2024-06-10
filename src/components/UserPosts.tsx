'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import PostIcon from './ui/icon/PostIcon';
import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import PostGrid from './PostGrid';

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: 'posts', icon: <PostIcon /> },
  { type: 'liked', icon: <HeartIcon /> },
  { type: 'bookmarked', icon: <BookmarkIcon /> },
];

export default function UserPosts({ user }: Props) {
  // 전달받은 user의 userName을 이용해서 해당 사용자의 포스트를 가져와야한다.
  // 사용자가 어떤 category를 선택했는지도 알야아함
  const [query, setQuery] = useState(tabs[0].type);

  const { userName } = user;

  return (
    <section className="w-full max-w-screen-xl mx-auto">
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`mx-12 p-4 cursor-pointer border-black md:flex items-center ${
              type === query && 'font-bold border-t'
            }`}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid userName={userName} query={query} />
    </section>
  );
}
