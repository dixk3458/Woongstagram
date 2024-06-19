import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { createNewPost } from '@/service/posts';
import withSessionUser from '@/util/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return withSessionUser(async user => {
    const formData = await req.formData();

    const text = formData.get('text') as string;
    const file = formData.get('file') as Blob;

    if (!text || !file) {
      return new Response('Bad request', { status: 400 });
    }

    return createNewPost(user.id, text, file)
      .then(res => NextResponse.json(res))
      .catch(error => new Response(JSON.stringify(error), { status: 500 }));
  });
}
