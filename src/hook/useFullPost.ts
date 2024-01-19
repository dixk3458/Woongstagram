import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(postid: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postid: postid,
      comment: comment,
    }),
  }).then(res => res.json());
}

export default function useFullPost(postid: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/post/${postid}`);

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;

      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/post'));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
