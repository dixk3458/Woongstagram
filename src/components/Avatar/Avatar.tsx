type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  // 정해지지 않은 외부 이미지 url을 사용하면 img를 사용하자.
  return (
    <div className="p-[0.1rem] w-9 h-9 bg-gradient-to-bl from-yellow-300 via-orange-400 to-amber-500  rounded-full">
      <img
        className="rounded-full"
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
