import { Comment } from '@/model/comment';
import { FullPost } from '@/model/post';
import axios from 'axios';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(postId: string, text: string) {
  const res = await axios.post('/api/comment', { postId: postId, text: text });
  return res.data;
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) {
        return;
      }

      const newPost = { ...post, comments: [...post.comments, comment] };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));
    },
    [post, mutate, globalMutate]
  );

  return { post, loading, error, postComment };
}
