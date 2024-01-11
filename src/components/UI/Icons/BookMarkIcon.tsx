type Props = {
  className?: string;
};

import { FaRegBookmark } from 'react-icons/fa';
export default function BookMarkIcon({ className }: Props) {
  return <FaRegBookmark className={className || 'w-7 h-7'} />;
}
