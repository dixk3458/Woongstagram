type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

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
      {/* eslint-disable @next/next/no-img-element  */}
      <img
        className={`rounded-full object-cover bg-white ${
          getImageSizeStyle(size).image
        }`}
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
  const { container } = getImageSizeStyle(size);
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]'
    : '';

  return `${baseStyle} ${container} ${highlightStyle}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  //size === 'small' ? 'w-9 h-9' : 'w-[68px] h-[68px]';
  switch (size) {
    case 'small':
      return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]' };
    case 'medium':
      return {
        container: 'w-[52px] h-[52px]',
        image: 'w-[48px] h-[48px] p-[0.1rem]',
      };
    case 'large':
      return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
    case 'xlarge':
      return {
        container: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };
    default:
      throw new Error(`Unsupported type size : ${size}`);
  }
}
