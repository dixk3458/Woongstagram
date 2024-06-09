import { useState } from 'react';
import useSWR from 'swr';

export default function UserSearch() {
  const [text, setText] = useState('');
  const {
    data,
    isLoading: loading,
    error,
  } = useSWR(`/api/search?keyword=${text}`);
  console.log(data);
  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      {/* {loading && <p>로딩중...</p>}
      {error && <p>에러...</p>}
      {!loading && !error && data.length < 1 ? (
        <p>유저 없음</p>
      ) : (
        <ul>
          {data.map((d: any) => (
            <li>{d.name}</li>
          ))}
        </ul>
      )} */}
    </>
  );
}
