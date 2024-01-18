import { FormEvent, useState } from 'react';
import SmileIcon from '../UI/Icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

// CommentForm 컴포넌트 자체에는 네트워크 요청을 하기에
// 데이터가 부족하다. 즉 알고있는 정보가 적다
// 따라서 Props으로 네트워크 요청을 하는 메서드를 받아오자.

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // 요청
    onPostComment(comment);
    setComment('');
  };


  return (
    <form
      className="flex  items-center border-t px-3 border-neutral-300"
      onSubmit={event => handleSubmit(event)}
    >
      <SmileIcon />
      <input
        className="w-full ml-2 p-3 border-none outline-none"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        required
        onChange={event => setComment(event.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${
          buttonDisabled ? 'text-orange-300' : 'text-orange-500 '
        }`}
      >
        Post
      </button>
    </form>
  );
}
