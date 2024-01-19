import { Comment, FullPost } from '@/model/post';
import useSWR from 'swr';

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

  const postComment = (comment: Comment) => {
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
    });
  };

  return { post, isLoading, error, postComment };
}
