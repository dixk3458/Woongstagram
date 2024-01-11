'use client';

import { SimplePost } from '@/model/post';
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';

type Props = {
  user: ProfileUser;
};

export default function UserPosts({ user }: Props) {
  // 인자로 받은 user의 선택된 tap에 따라서 게시물을 보여주면된다.

  const { userid } = user;
  const [tap, setTap] = useState('post');
  const { data, isLoading, error } = useSWR<SimplePost>(
    `/api/user/${userid}/${tap}`
  );

  console.log(data);

  return (
    <>
      <p>{data?.userid}</p>
    </>
  );
}
