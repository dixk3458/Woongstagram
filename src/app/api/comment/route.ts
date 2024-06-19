import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { addComment } from '@/service/posts';
import withSessionUser from '@/util/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const { postId, text } = await req.json();
    if (!postId || !text) {
      return new Response('Bad request', { status: 400 });
    }

    return addComment(postId, user.id, text)
      .then(res => NextResponse.json(res))
      .catch(error => new Response(JSON.stringify(error), { status: 500 }));
  });
}
