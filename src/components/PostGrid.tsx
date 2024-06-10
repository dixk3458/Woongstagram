import useSWR from 'swr';
import ProgressSpinner from './ui/ProgressSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';

type Props = {
  userName: string;
  query: string;
};

export default function PostGrid({ userName, query }: Props) {
  // 현재 카테고리에 맞게 서비스 요청을해야함
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>(`/api/users/${userName}/${query}`);

  return (
    <div>
      {loading && <ProgressSpinner />}
      {error && <p>에러...</p>}
      {!loading && !error && posts && posts.length < 1 && (
        <p>포스트가 없습니다.</p>
      )}
      <ul>
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
