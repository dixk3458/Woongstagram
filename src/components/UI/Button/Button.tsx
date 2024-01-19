type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  isLoading?: boolean;
};

export default function Button({
  text,
  onClick,
  red,
  isLoading = false,
}: Props) {
  return (
    <button
      disabled={isLoading}
      className={`rounded-md border-none font-bold text-white leading-4 px-8 py-2 ${
        red ? 'bg-red-500' : 'bg-green-500'
      } ${isLoading && 'opacity-80'}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
