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
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type} onClick={() => setQuery(type)}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid userName={userName} query={query} />
    </section>
  );
}
