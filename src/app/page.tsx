import PostList from '@/components/Post/PostList';
import FollowingBar from '@/components/User/FollowingBar';
import SideBar from '@/components/User/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // 만약 user가 없으면 login페이지로 redirect를 해주자.

  if (!user) {
    redirect('/auth/signin');
  }

  // user가 있을경우에 실행

  return (
    <section className="flex flex-col  max-w-[850px] p-4 md:flex-row ">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar
          user={{
            username: user.name,
            userid: user.userid,
            email: user.email,
            image: user.image,
          }}
        />
      </div>
    </section>
  );
}
