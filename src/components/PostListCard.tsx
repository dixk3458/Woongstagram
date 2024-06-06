'use client';

import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import Link from 'next/link';
import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { useState } from 'react';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './ui/PostUserAvatar';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const { userImage, userName, image, likes, text, createdAt } = post;
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
      <ActionBar
        likes={likes}
        userName={userName}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
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
