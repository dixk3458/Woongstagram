type Props = {
  image?: string | null;
  size?: 'small' | 'normal';
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'normal',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`rounded-full bg-white ${getImageSizeStyle(size)}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: string, highlight: boolean): string {
  //w-9 h-9 rounded-full bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]
  const baseStyle = 'rounded-full';
  const sizeStyle = size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]'
    : '';

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getImageSizeStyle(size: string): string {
  return size === 'small'
    ? 'w-[34px] h-[34px] p-[0.1rem]'
    : 'w-16 h-16 p-[0.2rem]';
}
