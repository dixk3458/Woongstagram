import { SimplePost } from '@/model/post';
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

export default function usePosts() {
  const {
    data: posts,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  const setLike = (post: SimplePost, userName: string, like: boolean) => {
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
  };

  return { posts, loading, error, setLike };
}
