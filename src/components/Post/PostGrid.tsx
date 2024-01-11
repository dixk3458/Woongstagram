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


  return (
    <div className='w-full'>
      {loading && (
        <div className="text-center">
          <GridSpinner />
        </div>
      )}
      <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
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
