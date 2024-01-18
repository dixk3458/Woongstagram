'use client';

import { SimplePost } from '@/model/post';
import Avatar from '../Avatar/Avatar';
import Image from 'next/image';

import CommentForm from './CommentForm';
import ActionBar from './ActionBar';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hook/usePosts';

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { id, userimage, userid, photo, likes, text, comments, createdAt } =
    post;
  const [openModal, setOpenModal] = useState(false);

  // 이미지가 클릭 되면 상세 페이지를 보여줄 계획이다.
  // 이 상세 페이지를 CSS를 통해 해당 Hirachy에서도 보여줄수있지만,
  // 나는 상세 페이지가 body의 하단부에 표시를 하기위해 Portal을 이용할계획이다.
  // body의 바로 하위 자식으로 content를 보여줄 portal을 생성하자.

  // 사용자의 클릭 이벤트 interaction 처리를 위해 클라이언트 컴포넌트
  // modal이 열렸는지 안열렸는지 상태관리

  const { postComment } = usePosts();

  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };
  return (
    <article className="rounded-lg shadow-md border-gray-200">
      <PostUserAvatar userid={userid} userimage={userimage} />
      <Image
        onClick={() => setOpenModal(true)}
        className="w-full object-cover aspect-square"
        src={photo}
        alt={`photo by ${userid}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar post={post}>
        <p>
          <span className="font-bold mr-1">{userid}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold text-orange-500 my-2"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={comment => handlePostComment(comment)} />
      {openModal && (
        // PostModal은 content를 portal에 이어주는 역할이다.
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            {/* PostDetail UI를 보여줘야한다.
            Props으로 post를 주면 PostDetail컴포넌트에서 그 post를 이용해 렌더링 */}
            <PostDetail post={post} />
          </PostModal>
        </Modal>
      )}
    </article>
  );
}
