import UserProfile from '@/components/UserProfile';
import { ProfileUser } from '@/model/user';
import { getUserForProfile } from '@/service/user';

type Context = {
  params: { userName: string };
};

export default async function UserPage({ params: { userName } }: Context) {
  const user = await getUserForProfile(userName);
  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
