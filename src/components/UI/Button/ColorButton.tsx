type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="bg-gradient-to-bl from-yellow-300 via-orange-400 to-amber-500 p-[0.15rem] rounded-md">
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-80 transition-opacity"
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
