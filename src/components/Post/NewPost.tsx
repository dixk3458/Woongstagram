'use client';

import { AuthUser } from '@/model/user';
import PostUserAvatar from './PostUserAvatar';
import Filesicon from '../UI/Icons/Filesicon';
import Button from '../UI/Button/Button';
import { ChangeEvent, useState } from 'react';

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
  const handleDrag = (e: DragEvent) => {
    // console.log('dragEvent', e);
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    // console.log('dragOver', e);
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
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
    <section>
      <PostUserAvatar userid={userid} userimage={image ?? ''} />
      <form action="">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor="input-upload"
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
        >
          <Filesicon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          name="text"
          id="input-text"
          rows={10}
          required
          placeholder="Write a caption..."
          className="resize-none"
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
