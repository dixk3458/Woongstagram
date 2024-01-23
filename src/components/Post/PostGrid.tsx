import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import GridSpinner from '../UI/Spinner/GridSpinner';
import PostGridCard from './PostGridCard';
import usePosts from '@/hook/usePosts';

type Props = {
  userid: string;
  query: string;
};

export default function PostGrid({ userid, query }: Props) {
  const cacheKey = `/api/user/${userid}/${query}`;
  const { posts, isLoading: loading } = usePosts(cacheKey);

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
              <PostGridCard
                post={post}
                priority={index < 6}
                cacheKey={cacheKey}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
