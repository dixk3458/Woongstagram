import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { User } from '@/model/user';
import { getFollowingPostsOf } from '@/service/post';

export async function GET() {
  // 서버측에서 요청을 받으면 먼저 유효성 검사를 해주자.
  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  if (!user) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  // 유효성 검사를 통과하면 서버에서 Sanity 데이터를 가져와야한다.
  return getFollowingPostsOf(user.userid).then(data => NextResponse.json(data));
}
