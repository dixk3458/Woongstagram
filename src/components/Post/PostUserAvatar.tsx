import Avatar from '../Avatar/Avatar';

type Props = {
  userimage: string;
  userid: string;
};

export default function PostUserAvatar({ userimage, userid }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={userimage} size="medium" highlight />
      <span className="text-gray-700 font-bold ml-2">{userid}</span>
    </div>
  );
}
