import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addBookmark, removeBookmark } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  const { postId, bookmark } = await req.json();

  if (!postId || bookmark == undefined) {
    return new Response('Bad request', { status: 400 });
  }

  // 북마크 할건지 취소할건지
  const request = bookmark ? addBookmark : removeBookmark;

  // 서버에서 sanity에 요청할 때
  return request(user.id, postId)
    .then(res => NextResponse.json(res))
    .catch(error => new Response(error, { status: 500 }));
}
