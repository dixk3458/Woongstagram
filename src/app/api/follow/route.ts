import { follow, unfollow } from '@/service/user';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;

  return request(user.usertokenid, targetId)
    .then(data => NextResponse.json(data))
    .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
}
