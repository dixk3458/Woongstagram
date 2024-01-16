import { addBookmark, removeBookmark } from '@/service/user';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // 서버측에서 사용자 유효성 검사
  if (!user) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  // 어떤 포스트에 bookmark를 할건지 안할건지 전달받음
  const { postid, bookmark } = await req.json();

  if (!postid || bookmark === undefined) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const request = bookmark ? addBookmark : removeBookmark;

  return request(user.usertokenid, postid)
    .then(res => NextResponse.json(res))
    .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
}
