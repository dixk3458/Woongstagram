type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';

type ImageSizeStyle = {
  container: string;
  image: string;
};

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
        className={`bg-white object-cover rounded-full 
        ${getImageSizeStyle(size).image}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, hightlight: boolean): string {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const hightlightStyle = `${
    hightlight
      ? 'bg-gradient-to-bl from-yellow-300 via-orange-300 to-amber-300'
      : ''
  }`;

  const { container } = getImageSizeStyle(size);

  return `${baseStyle} ${hightlightStyle} ${container}`;
}

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case 'small':
      return { container: 'w-9 h-9', image: 'w-[34px] h-[34px] p-[0.1rem]' };
    case 'medium':
      return { container: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.1rem]' };
    case 'large':
      return { container: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
    case 'xlarge':
      return {
        container: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };
    default:
      throw new Error(`Unsupported  type size: ${size}`);
  }
}

// 함수가 중복될때 리팩터링
