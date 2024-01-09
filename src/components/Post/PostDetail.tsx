import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import Avatar from '../Avatar/Avatar';
import CommentForm from './CommentForm';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  // PostListCard로부터 받아온 Post 객체안에는 SimplePost 타입의 post가 들어있다.
  // 즉 comments에는 해당 post의 comment의 개수만 있다.
  // 하지만 우리가 원하는것은 comments 배열에 comment 타입의 객체가 있기를 바란다.

  const { userid, userimage, photo, text, likes, id, createdAt } = post;

  // comments는 api route를 이용해 받아오자.
  // 해당 post의 고유 id로 통신
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  const comments = data?.comments;

  return (
    <section>
      <div className="relative">
        <Image
          src={photo}
          alt={`photo by ${userid}`}
          sizes="650px"
          fill
          priority
        />
      </div>
      <div>
        <PostUserAvatar userid={userid} userimage={userimage} />
        <ul>
          {comments &&
            comments.map(
              ({ userid: commentUserid, userimage, comment }, index) => (
                <li key={index}>
                  <Avatar
                    image={userimage}
                    size="small"
                    highlight={commentUserid === userid}
                  />
                  <div>
                    <span>{commentUserid}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar userid={userid} createdAt={createdAt} likes={likes} />
        <CommentForm/>
      </div>
    </section>
  );
}
