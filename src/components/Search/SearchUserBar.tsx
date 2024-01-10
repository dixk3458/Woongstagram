'use client';

import { SearchedUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from '../UI/Spinner/GridSpinner';
import UserCard from '../User/UserCard';

export default function SearchUserBar() {
  // 사용자의 입력데이터를 이용해 서버에게 요청을해야한다.
  // Client 컴포넌트로 동적으로 요청할수있게해주자.

  // 만약 keyword가 있다면 /api/search
  // 없다면 /api/search/jaewoong
  // 즉 API route를 두가지 만들어야 한다.

  const [keyword, setKeyword] = useState('');

  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<SearchedUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={e => onSubmit(e)}>
        <input
          className="w-full text-xl p-3 border border-gray-400 outline-none"
          type="text"
          autoFocus
          placeholder="Search for a userid or username"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
        />
      </form>
      {error && <p>에러가 발생했습니다. 다시 시도해주세요.😅</p>}
      {loading && (
        <div className="mt-[30px]">
          <GridSpinner />
        </div>
      )}
      {!loading && !error && users?.length == 0 && (
        <p>사용자를 찾을 수 없습니다. 다시 시도해주세요. 😅</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map(user => (
            <li key={user.userid}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
