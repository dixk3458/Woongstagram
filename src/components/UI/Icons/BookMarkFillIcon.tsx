import { FaBookmark } from 'react-icons/fa';

type Props = {
  className?: string;
};

export default function BookMarkFillIcon({ className }: Props) {
  return <FaBookmark className={`fill-black ${className || 'w-7 h-7'}`} />;
}
