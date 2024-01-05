import PostList from '@/components/Post/PostList';
import FollowingBar from '@/components/User/FollowingBar';
import SideBar from '@/components/User/SideBar';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { name, email, image, userid } = user;

  // 만약 user가 없으면 login페이지로 redirect를 해주자.

  if (!user) {
    redirect('/auth/signin');
  }

  // user가 있을경우에 실행

  return (
    <>
      <div>
        <FollowingBar />
        <PostList />
      </div>
      <SideBar
        user={{ username: name, email: email, image: image, userid: userid }}
      />
    </>
  );
}
