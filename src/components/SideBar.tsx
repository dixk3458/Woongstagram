import { getServerSession } from 'next-auth';
import Avatar from './Avatar';
import { AuthUser } from '@/model/user';

type Props = {
  user: AuthUser;
};

export default async function SideBar({
  user: { name, userName, image },
}: Props) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} size="medium" highlight={false} />}
        <div className="ml-4">
          <p className="font-bold">{userName}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-sm text-neutral-500 mt-8">
        About ∙ Help ∙ Press ∙ API ∙ Jobs ∙ Privacy ∙ Terms ∙ Location ∙
        Language
      </p>
      <p className="text-sm text-neutral-500 mt-8">
        © 2024 Jaewoong, Built with Next
      </p>
    </>
  );
}
