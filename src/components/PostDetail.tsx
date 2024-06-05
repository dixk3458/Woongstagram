import { SimplePost } from '@/model/post';
import useSWR from 'swr';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, createdAt, userName, userImage, image, text, likes } = post;
  const { data, isLoading, error } = useSWR(`/api/posts/${id}`);
  console.log(data);
  return <></>;
}
