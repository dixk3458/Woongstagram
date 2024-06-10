'use client';

import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

const categories = ['posts', 'liked', 'bookmarks'];

export default function UserPosts({ user }: Props) {
  // 전달받은 user의 userName을 이용해서 해당 사용자의 포스트를 가져와야한다.
  // 사용자가 어떤 category를 선택했는지도 알야아함
  const [category, setCategory] = useState(categories[0]);

  const { userName } = user;

  // 현재 카테고리에 맞게 서비스 요청을해야함
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${userName}/${category}`);

  console.log(posts);

  return <></>;
}
