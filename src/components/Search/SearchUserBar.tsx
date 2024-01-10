'use client';

import { useState } from 'react';
import useSWR from 'swr';

export default function SearchUserBar() {
  // 사용자의 입력데이터를 이용해 서버에게 요청을해야한다.
  // Client 컴포넌트로 동적으로 요청할수있게해주자.

  // 만약 keyword가 있다면 /api/search
  // 없다면 /api/search/jaewoong
  // 즉 API route를 두가지 만들어야 한다.

  const [keyword, setKeyword] = useState('');

  const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);
  return <></>;
}
