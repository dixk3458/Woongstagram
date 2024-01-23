import GridSpinner from '../UI/Spinner/GridSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hook/usePosts';

export default function PostGrid() {
  const { posts, isLoading: loading } = usePosts();

  return (
    <div className="w-full">
      {loading && (
        <div className="text-center">
          <GridSpinner />
        </div>
      )}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={index}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
