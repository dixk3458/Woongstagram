type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
};

export default function Button({ text, onClick, red }: Props) {
  return (
    <button
      className={`rounded-md border-none font-bold text-white leading-4 px-8 py-2 ${
        red ? 'bg-red-500' : 'bg-green-500'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
