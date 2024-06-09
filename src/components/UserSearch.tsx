import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import ProgressSpinner from './ui/ProgressSpinner';

export default function UserSearch() {
  const [text, setText] = useState('');
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search?keyword=${text}`);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </form>
      {error && <p>에러가 발생했습니다.</p>}
      {loading && <ProgressSpinner />}
      {!error && !loading && users && users.length < 1 && (
        <p>사용자가 없습니다.</p>
      )}
      <ul>
        {users &&
          users.length > 0 &&
          users.map(user => <li key={user.userName}>{user.name}</li>)}
      </ul>
    </>
  );
}
