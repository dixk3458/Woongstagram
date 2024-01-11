import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import GridSpinner from '../UI/Spinner/GridSpinner';
import PostGridCard from './PostGridCard';

type Props = {
  userid: string;
  query: string;
};

export default function PostGrid({ userid, query }: Props) {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>(`/api/user/${userid}/${query}`);

  console.log(posts);

  return (
    <div>
      {loading && (
        <div>
          <GridSpinner />
        </div>
      )}
      <ul>
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
