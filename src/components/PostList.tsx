'use client';

import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import ProgressSpinner from './ui/ProgressSpinner';
import usePosts from '@/hooks/usePosts';

export default function PostList() {
  const { posts, loading, error } = usePosts();

  return (
    <section>
      {loading && (
        <div className="flex justify-center">
          <ProgressSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
