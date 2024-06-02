type AvatarSize = 'small' | 'medium' | 'large';

type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
}: Props) {
  return (
    <div className={getContainerStyle(size, highlight)}>
      <img
        className={`rounded-full object-cover bg-white ${getImageSizeStyle(
          size
        )}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  //w-9 h-9 rounded-full bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]
  const baseStyle = 'rounded-full flex justify-center items-center';
  const sizeStyle = getContainerSizeStyle(size);
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]'
    : '';

  return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
}

function getContainerSizeStyle(size: AvatarSize) {
  //size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
  switch (size) {
    case 'small':
      return 'w-9 h-9';
    case 'medium':
      return 'w-[52px] h-[52px]';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
}

function getImageSizeStyle(size: AvatarSize): string {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px] p-[0.1rem]';
    case 'medium':
      return 'w-[48px] h-[48px] p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.2rem]';
  }
}
