import CloseBtn from '../UI/Button/CloseButton';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
  // 만약
  // 이벤트가 등록된 부분 event.currentTarget과
  // 실제 이벤트를 발생시킨(클릭된 부분) event.target이 같다면
  // 창을 닫아줄것이다.
  // 즉 x버튼과 container의 빈 요소들을 클릭했을때 창 닫아줄것
  return (
    <section
      className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full z-50 bg-neutral-900/70"
      onClick={event => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseBtn />
      </button>
      <div className='bg-white w-4/5 h-3/5 max-w-7xl'>{children}</div>
    </section>
  );
}
