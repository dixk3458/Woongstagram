type Props = {
  text: string;
  onClick: () => void;
  size?: 'small' | 'big';
};
export default function ColorButton({ text, onClick, size = 'small' }: Props) {
  return (
    <div
      className={`bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300  rounded-md
        ${size === 'big' ? 'p-[0.3rem]' : 'p-[0.15rem]'}
      `}
    >
      <button
        className={`bg-white rounded-sm hover:opacity-80 transition-opacity
          ${size === 'big' ? 'p-[0.6rem] text-2xl' : 'p-[0.3rem] text-base'}
        `}
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
