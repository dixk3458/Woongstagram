import useSWR from 'swr';
import ProgressSpinner from './ui/ProgressSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';
import usePosts from '@/hooks/usePosts';

export default function PostGrid() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="w-full text-center">
      {loading && <ProgressSpinner />}
      {error && <p>에러...</p>}
      {!loading && !error && posts && posts.length < 1 && (
        <p>포스트가 없습니다.</p>
      )}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
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
