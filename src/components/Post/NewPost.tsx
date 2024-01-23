'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import Filesicon from '../UI/Icons/Filesicon';
import Button from '../UI/Button/Button';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { userid, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    // console.log('dragEvent', e);
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    // console.log('dragOver', e);
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    // console.log('dragDrop', e);
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log('files', files[0]);
      console.log('e.transfer', e.dataTransfer);
    }
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar userid={userid} userimage={image ?? ''} />
      <form className="w-full flex flex-col mt-2">
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
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
