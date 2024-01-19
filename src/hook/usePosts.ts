import { Comment, SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(postid: string, like: boolean) {
  return fetch('/api/like', {
    method: 'PUT',
    body: JSON.stringify({
      postid: postid,
      liked: like,
    }),
  }).then(res => res.json());
  // 글로벌로 설정한 fetch가 아니기에 직접 res를 처리해주어야한다.
}

async function addComment(postid: string, comment: string) {
  return fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postid: postid,
      comment: comment,
    }),
  }).then(res => res.json());
  // 글로벌로 설정한 fetch가 아니기에 직접 res를 처리해주어야한다.
}

export default function usePosts() {
  // 커스텀 훅으로 posts를 가져오고
  // posts에대한 유용한 정보를 반환해줄것이다.

  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/post');
  const setLike = (post: SimplePost, userid: string, like: boolean) => {
    // Sanity에 로직이 완료되기전에 먼저 UI상으로 빠르게 보여주기위해 데이터를 생성
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, userid]
        : post.likes.filter(item => item !== userid),
    };

    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  const postComment = (post: SimplePost, comment: Comment) => {
    // Sanity에 로직이 완료되기전에 먼저 UI상으로 빠르게 보여주기위해 데이터를 생성
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };

    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike, postComment };
}
