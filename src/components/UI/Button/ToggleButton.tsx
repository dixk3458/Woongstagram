type Props = {
  toggled: boolean;
  onToggle: (toggle: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({
  toggled,
  onToggle,
  onIcon,
  offIcon,
}: Props) {
  // toggled의 상태값에 따라서 다른 UI를 보여줌
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
