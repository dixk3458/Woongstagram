import { IoMdGrid } from 'react-icons/io';

type Props = {
  className?: string;
};

export default function PostIcon({ className }: Props) {
  return <IoMdGrid className={className ?? 'w-7 h-7'} />;
}
