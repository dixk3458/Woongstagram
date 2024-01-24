'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import Filesicon from '../UI/Icons/Filesicon';
import Button from '../UI/Button/Button';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from '../UI/Spinner/GridSpinner';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { userid, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
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
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/post/', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        // fetch 및
        // 성공적으로 새로운 데이터를 만들었다면
        // router를 이용해 Home으로 이동

        router.push('/');
      })
      .catch(error => {
        // 서버측에서 문제가 발생했다면,
        setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute bg-orange-500/20 inset-0 z-20 pt-[20%] text-center">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 font-bold mb-4 ">
          {error}
        </p>
      )}
      <PostUserAvatar userid={userid} userimage={image ?? ''} />
      <form
        className="w-full flex flex-col mt-2"
        onSubmit={e => handleSubmit(e)}
      >
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={e => handleChange(e)}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && 'border-2 border-orange-500 border-dashed'
          }`}
          htmlFor="input-upload"
          onDragEnter={e => handleDrag(e)}
          onDragLeave={e => handleDrag(e)}
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleDrop(e)}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-orange-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <Filesicon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="bg-white border-2 border-gray-300 relative w-full aspect-square ">
              <Image
                className="w-full object-contain p-2"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
              />
            </div>
          )}
        </label>
        <textarea
          name="text"
          id="input-text"
          rows={10}
          required
          placeholder="Write a caption..."
          className="resize-none outline-none text-lg border border-neutral-300"
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
