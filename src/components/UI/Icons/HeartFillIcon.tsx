import { FaHeart } from 'react-icons/fa';

type Props = {
  className?: string;
};

export default function HeartFillIcon({ className }: Props) {
  return <FaHeart className={`fill-red-500 ${className || 'w-7 h-7'}`} />;
}
