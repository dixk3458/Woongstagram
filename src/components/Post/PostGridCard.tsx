'use client';

import { SimplePost } from '@/model/post';
import Image from 'next/image';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import { signIn, useSession } from 'next-auth/react';

type Props = {
  post: SimplePost;
  priority: boolean;
  cacheKey: string;
};

export default function PostGridCard({ post, priority, cacheKey }: Props) {
  const { photo, userid } = post;

  // PostListCard에서와 마찬가지로 클릭하면 PostDetail을 생성해야한다.

  // modal이 열려야하는지 닫혀야하는지를 상태

  const [openModal, setOpenModal] = useState(false);

  // 로그인 한 사용자만 PostDetail 페이지를 보여줄것이다.

  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      // redirect('/auth/signin')
      // 클라이언트 컴포넌트이기때문에 redirect를 사용할수없다.
      // 따라서 useRouter를 사용하거나 , NextAuth 에서 제공하는 signIn을 이용해야한다.
      return signIn();
    }

    setOpenModal(true);
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover "
        onClick={() => handleOpenPost()}
        src={photo}
        alt={`photo by ${userid}`}
        fill
        sizes="650px"
        priority={priority}
      />
      {openModal && (
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} cacheKey={cacheKey} />
          </PostModal>
        </Modal>
      )}
    </div>
  );
}
