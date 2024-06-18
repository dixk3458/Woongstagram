'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './ui/PostUserAvatar';
import FileIcon from './ui/icon/FileIcon';
import Button from './ui/Button';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user }: Props) {
  const { image, userName } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    const dragType = e.type;

    if (dragType === 'dragenter') {
      setDragging(true);
    } else {
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
  return (
    <section className="w-full flex flex-col items-center">
      <PostUserAvatar image={image ?? ''} userName={userName} />
      <form className="w-full flex flex-col items-center">
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
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
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
        />
        <Button onClick={() => {}} text="Publish" />
      </form>
    </section>
  );
}
