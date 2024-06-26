import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  if (typeof window === undefined) {
    return;
  }
  const node = document.getElementById('portal') as Element;
  return createPortal(children, node);
}
