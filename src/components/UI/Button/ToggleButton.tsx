type Props = {
  title: string;
  toggled: boolean;
  onToggle: (toggle: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
};

export default function ToggleButton({
  title,
  toggled,
  onToggle,
  onIcon,
  offIcon,
}: Props) {
  // toggled의 상태값에 따라서 다른 UI를 보여줌
  return (
    <button aria-label={title} onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}
