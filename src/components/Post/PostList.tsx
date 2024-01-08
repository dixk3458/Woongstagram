'use client';

import useSWR from 'swr';

export default function PostList() {
  // 1. 내가 following 하고있는 유저의 정보를 가져온다.
  // 2. 그 유저들의 post를 가져온다.
  // 3. UI를 보여준다.

  // PostList 컴포넌트는 Client Component로 서버에서 렌더링하기 어려운
  // 데이터를 담고있다.
  // 클라이언트 측에서 서버에 데이터를 요청해야한다.
  // 서버에서는 나에대한 정보를 알고있다.
  // 나의 id를 전달할 이유가 없다.
  // 서버측에서 session 데이터를 이용해 해결하자.

  const { data, isLoading, error } = useSWR('/api/post');
  console.log(data);

  return <p>PostList</p>;
}
