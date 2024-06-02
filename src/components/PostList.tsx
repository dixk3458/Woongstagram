'use client';

import { SimplePost } from '@/model/post';
import { ProgressBar } from 'react-loader-spinner';
import useSWR from 'swr';
import PostListCard from './PostListCard';

export default function PostList() {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR<SimplePost[]>('/api/posts');

  return (
    <section>
      {loading && (
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          borderColor="#BEB4FD"
          barColor="#F1ABDE"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {posts && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
