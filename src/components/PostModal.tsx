import CloseIcon from './ui/icon/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  return (
    <section
      className="bg-neutral-900/70 w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center"
      onClick={event => {
        if (event.target === event.currentTarget) {
          // 실제 이벤트가 등록된 부분인 currentTarget과
          // 클릭된 부분 target이 section 빈 여백과 같다면
          // 창 닫을거
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 m-8 text-white transition:scale hover:scale-110 hover:text-rose-300"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
