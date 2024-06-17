'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './ui/PostUserAvatar';
import usePosts from '@/hooks/usePosts';
import { Comment } from '@/model/comment';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const { userImage, userName, image, likes, text, createdAt, comments } = post;

  const { postComment } = usePosts();

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg border border-neutral-200 shadow-md overflow-hidden">
      <PostUserAvatar image={userImage} userName={userName} />
      <Image
        src={image}
        alt={`photo by ${userName}`}
        width={500}
        height={500}
        className="w-full object-cover aspect-square"
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-2 mb-1">{userName}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-neutral-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
