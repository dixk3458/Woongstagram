type Props = {
  image?: string | null;
};

export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 p-[0.1rem]">
      <img
        className="rounded-full "
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
