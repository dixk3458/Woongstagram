import { addComment } from '@/service/post';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse('Authentiaction Error', { status: 401 });
  }

  const { postid, comment } = await req.json();

  if (!postid || !comment) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  // Sanity에 요청
  // postid를 가진 post에 접근해 patch를 해줌
  // comments를 patch하는데
  // author에는 usertokenid를 가진 user를
  // comment에는 comment
  return addComment(user.usertokenid, postid, comment)
    .then(data => NextResponse.json(data))
    .catch(error => new NextResponse(JSON.stringify(error), { status: 501 }));
}
