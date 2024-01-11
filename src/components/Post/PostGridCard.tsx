'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority }: Props) {
  const { photo, userid } = post;

  // PostListCard에서와 마찬가지로 클릭하면 PostDetail을 생성해야한다.

  // modal이 열려야하는지 닫혀야하는지를 상태

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Image
        onClick={() => setOpenModal(true)}
        src={photo}
        alt={`photo by ${userid}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {openModal && (
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </Modal>
      )}
    </div>
  );
}
