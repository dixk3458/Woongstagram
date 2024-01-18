import { FormEvent, useState } from 'react';
import SmileIcon from '../UI/Icons/SmileIcon';

type Props = {
  postid: string;
};

export default function CommentForm({ postid }: Props) {
  const [comment, setComment] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // 요청
    fetch('/api/comment', {
      method: 'PUT',
      body: JSON.stringify({
        postid: postid,
        comment: comment,
      }),
    });
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
        onChange={event => setComment(event.target.value)}
      />
      {comment ? (
        <button className="font-bold text-orange-500 ml-2">Post</button>
      ) : (
        <button disabled className="opacity-40 font-bold text-orange-500 ml-2">
          Post
        </button>
      )}
    </form>
  );
}
