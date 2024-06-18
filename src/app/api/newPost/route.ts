import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { createNewPost } from '@/service/posts';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  const formData = await req.formData();

  const text = formData.get('text') as string;
  const file = formData.get('file') as Blob;

  if (!text || !file) {
    return new Response('Bad request', { status: 400 });
  }

  return createNewPost(user.id, text, file)
    .then(res => NextResponse.json(res))
    .catch(error => new Response(JSON.stringify(error), { status: 500 }));
}
