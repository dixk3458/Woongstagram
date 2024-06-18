type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};

export default function Button({
  text,
  onClick,
  red,
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={`w-full px-6 py-2 text-white font-bold rounded-md border-none ${
        red ? 'bg-red-500' : 'bg-blue-500'
      } ${disabled && 'opacity-80'}`}
    >
      {text}
    </button>
  );
}
