type Props = {
  text: string;
  onClick: () => void;
  size?: 'small' | 'normal' | 'large';
};

export default function ColorButton({ text, onClick, size = 'normal' }: Props) {
  return (
    <div
      className={`bg-gradient-to-bl from-yellow-300 via-orange-400 to-amber-500  rounded-md
      ${size === 'large' ? 'p-[0.3rem]' : 'p-[0.15rem]'}`}
    >
      <button
        className={`w-full bg-white rounded-sm  hover:opacity-80 transition-opacity 
        ${size === 'large' ? 'p-4 text-2xl' : 'p-[0.3rem] text-base '}`}
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
