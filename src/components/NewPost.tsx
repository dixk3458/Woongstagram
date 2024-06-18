'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './ui/PostUserAvatar';
import FileIcon from './ui/icon/FileIcon';
import Button from './ui/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import ProgressSpinner from './ui/ProgressSpinner';
import { useRouter } from 'next/navigation';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const { image, userName } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [text, setText] = useState('');

  const router = useRouter();

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    const dragType = e.type;

    if (dragType === 'dragenter') {
      setDragging(true);
    } else if (dragType === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setDragging(false);

    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    fetch('/api/newPost', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch(error => setError(error.toString()))
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError('');
        }, 3000);
      });
  };
  return (
    <section className="w-full flex flex-col items-center">
      {loading && (
        <div className="absolute inset-0 z-20 bg-neutral-500/20 flex flex-col justify-center items-center">
          <ProgressSpinner />
        </div>
      )}
      <PostUserAvatar image={image ?? ''} userName={userName} />
      {error && <p className="text-red-600 font-bold p-2">{error}</p>}
      <form
        className="w-full flex flex-col items-center mt-2"
        onSubmit={e => handleSubmit(e)}
      >
        <input
          type="file"
          name="input"
          id="input-upload"
          accept="image/*"
          className="hidden"
          onChange={e => handleChange(e)}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-violet-400 border-dashed'
          }`}
          htmlFor="input-upload"
          onDragEnter={e => handleDrag(e)}
          onDragLeave={e => handleDrag(e)}
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e)}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FileIcon />
              <p>Drag and Drop here or Click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square border-neutral-300">
              <Image
                className="object-contain border "
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="resize-none w-full outline-none text-lg border border-neutral-300 p-2"
          name="text"
          id="input-text"
          rows={6}
          required
          placeholder="Write a caption..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <Button onClick={() => {}} text="Publish" />
      </form>
    </section>
  );
}
