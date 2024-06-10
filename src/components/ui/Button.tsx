type Props = {
  text: string;
  onClick: () => void;
  red: boolean;
};

export default function Button({ text, onClick, red }: Props) {
  return (
    <button
      onClick={() => onClick()}
      className={`px-6 py-2 text-white font-bold rounded-md border-none ${
        red ? 'bg-red-500' : 'bg-blue-500'
      }`}
    >
      {text}
    </button>
  );
}
