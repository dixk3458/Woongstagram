type Props = {
  text: string;
  onClick: () => void;
};
export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className="bg-gradient-to-bl red-t from-indigo-300 via-purple-300 to-pink-300 p-[0.15rem] rounded-md">
      <button
        className="bg-white rounded-sm text-base p-[0.3rem] hover:opacity-80 transition-opacity"
        onClick={() => onClick()}
      >
        {text}
      </button>
    </div>
  );
}
