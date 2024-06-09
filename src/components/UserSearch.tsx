import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import ProgressSpinner from './ui/ProgressSpinner';
import UserCard from './UserCard';
import { useDebounce } from '@/hooks/useDebounce';

export default function UserSearch() {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 1000);
  
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search?keyword=${debouncedText}`);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full flex flex-col items-center max-w-2xl">
      <form onSubmit={e => handleSubmit(e)} className="w-full my-2">
        <input
          type="text"
          autoFocus
          placeholder="Search for a username or name"
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full text-2xl p-4 outline-none border border-gray-300"
        />
      </form>
      {error && <p className="font-bold">에러가 발생했습니다.</p>}
      {loading && <ProgressSpinner />}
      {!error && !loading && users && users.length < 1 && (
        <p className="font-bold">사용자가 없습니다.</p>
      )}
      <ul className="w-full flex flex-col gap-2 my-2">
        {users &&
          users.length > 0 &&
          users.map(user => (
            <li key={user.userName}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
