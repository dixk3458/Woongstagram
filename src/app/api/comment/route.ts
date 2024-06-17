import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addComment } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  const { postId, text } = await req.json();
  if (!postId || !text) {
    return new Response('Bad request', { status: 400 });
  }

  return addComment(postId, user.id, text)
    .then(res => NextResponse.json(res))
    .catch(error => new Response(JSON.stringify(error), { status: 500 }));
}
