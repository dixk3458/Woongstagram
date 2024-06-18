import { SimplePost } from '@/model/post';
import Image from 'next/image';
import PostUserAvatar from './ui/PostUserAvatar';
import ActionBar from './ActionBar';
import Link from 'next/link';
import Avatar from './Avatar';
import useFullPost from '@/hooks/useFullPost';

type Props = {
  post: SimplePost;
  cacheKey?: string;
};

export default function PostDetail({ post, cacheKey }: Props) {
  const { id, createdAt, userName, userImage, image, text, likes } = post;
  const { post: fullPost, postComment } = useFullPost(id);

  const comments = fullPost?.comments;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${userName}`}
          sizes="650px"
          fill
          priority
        />
      </div>
      <div className="basis-2/5 flex flex-col">
        <PostUserAvatar image={userImage} userName={userName} />
        <ul className="p-4 overflow-y-auto flex-1 border-t border-gray-200 mb-1">
          {comments &&
            comments.map(
              ({ userName: commenterName, userImage, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Link href={`/user/${userName}`}>
                    <Avatar
                      image={userImage}
                      size="small"
                      highlight={userName === commenterName}
                    />
                  </Link>
                  <div className="ml-2">
                    <span className="font-bold">{commenterName}</span>
                    <span className="ml-2">{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} cacheKey={cacheKey} />
      </div>
    </section>
  );
}
