import { getServerSession } from 'next-auth';
import Avatar from './Avatar';
import { User } from '@/model/user';

type Props = {
  user: User;
};

export default async function SideBar({
  user: { name, userName, image },
}: Props) {
  console.log(userName);
  return (
    <>
      <div>
        {image && <Avatar image={image} />}
        <div>
          <p>{userName}</p>
          <p>{name}</p>
        </div>
      </div>
      <p>
        About ∙ Help ∙ Press ∙ API ∙ Jobs ∙ Privacy ∙ Terms ∙ Location ∙
        Language
      </p>
      <p>© 2024 Jaewoong, Built with Next</p>
    </>
  );
}
