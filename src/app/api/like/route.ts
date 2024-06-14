import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { dislikePost, likePost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  // 로그인한 사용자만 이용
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  const { postId, liked } = await req.json();

  // 유효성 검사
  if (!postId || liked === undefined) {
    return new Response('Authentication Error', { status: 400 });
  }

  // liked에 따라서 다른 요청
  const request = liked ? likePost : dislikePost;

  return request(postId, user.id)
    .then(res => NextResponse.json(res))
    .catch(error => new Response(error, { status: 500 }));
}
