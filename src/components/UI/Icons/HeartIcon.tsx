type Props = {
  className?: string;
};

import { FaRegHeart } from 'react-icons/fa';
export default function HeartIcon({ className }: Props) {
  return <FaRegHeart className={className || 'w-7 h-7'} />;
}
