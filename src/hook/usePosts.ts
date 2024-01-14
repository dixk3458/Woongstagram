import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

export default function usePosts() {
  // 커스텀 훅으로 posts를 가져오고
  // posts에대한 유용한 정보를 반환해줄것이다.
  const { mutate } = useSWRConfig();

  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');
  const setLike = (post: SimplePost, usertokenid: string, like: boolean) => {
    fetch('/api/like', {
      method: 'PUT',
      body: JSON.stringify({
        postid: post.id,
        like: like,
      }),
    }).then(() => mutate('/api/post'));
  };

  return { posts, isLoading, error, setLike };
}
