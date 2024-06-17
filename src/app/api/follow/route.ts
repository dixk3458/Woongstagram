import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { follow, unfollow } from '@/service/user';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  const { targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('Bad request', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.id, targetId)
    .then(res => NextResponse.json(res))
    .catch(error => new Response(JSON.stringify(error), { status: 500 }));
}
