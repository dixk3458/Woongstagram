import PostList from '@/components/Post/PostList';
import FollowingBar from '@/components/User/FollowingBar';
import SideBar from '@/components/User/SideBar';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
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
    <section className="flex flex-col md:flex-row w-full max-w-[850px]">
      <div className="w-full basis-3/4 min-w-0">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4 ml-8">
        <SideBar
          user={{
            username: user.username,
            userid: user.userid,
            email: user.email,
            userimage: user.userimage,
            usertokenid: user.usertokenid,
          }}
        />
      </div>
    </section>
  );
}
