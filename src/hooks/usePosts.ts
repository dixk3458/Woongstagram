import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment } from '@/model/comment';
import { SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function updateLike(postId: string, like: boolean) {
  return fetch('/api/like', {
    method: 'PUT',
    body: JSON.stringify({
      postId: postId,
      liked: like,
    }),
  }).then(res => res.json());
}

async function addComment(postId: string, text: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({ postId: postId, text: text }),
  }).then(res => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postKey);

  const setLike = useCallback(
    (post: SimplePost, userName: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, userName]
          : post.likes.filter(item => item !== userName),
      };

      const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = { ...post, comments: post.comments + 1 };
      const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return { posts, loading, error, setLike, postComment };
}
