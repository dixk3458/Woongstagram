import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { AuthUser } from '@/model/user';
import { getFollowingPostsOf } from '@/service/post';
import { authOptions } from '@/utils/authOptions';

export async function GET() {
  // 서버측에서 요청을 받으면 먼저 유효성 검사를 해주자.
  const session = await getServerSession(authOptions);
  const user = session?.user as AuthUser;

  if (!user) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  // 유효성 검사를 통과하면 서버에서 Sanity 데이터를 가져와야한다.
  return getFollowingPostsOf(user.userid).then(data => NextResponse.json(data));
}
