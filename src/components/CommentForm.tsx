import { FormEvent, useState } from 'react';

type Props = {
  onPostComment: (text: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [text, setText] = useState('');

  const buttonDisabled = text.length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPostComment(text);
    setText('');
  };

  return (
    <form className="flex border-t" onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        className="grow border-none outline-none py-2 px-4"
        value={text}
        onChange={e => setText(e.target.value)}
        required
      />
      <button
        disabled={buttonDisabled}
        className={`bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 font-bold p-2 ${
          buttonDisabled ? 'opacity-70' : 'opacity-100'
        }`}
      >
        POST
      </button>
    </form>
  );
}
