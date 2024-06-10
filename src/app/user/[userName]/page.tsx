import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { ProfileUser } from '@/model/user';
import { getUserForProfile } from '@/service/user';

type Context = {
  params: { userName: string };
};

export default async function UserPage({ params: { userName } }: Context) {
  const user = await getUserForProfile(userName);
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full border-b border-neutral-300">
        <UserProfile user={user} />
      </div>
      <div className="w-full grow">
        <UserPosts user={user} />
      </div>
    </section>
  );
}
