import { follow, unfollow } from '@/service/user';
import { sessionWithUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return sessionWithUser(async user => {
    const { id: targetId, follow: isFollow } = await req.json();

    if (!targetId || isFollow === undefined) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    return request(user.usertokenid, targetId)
      .then(data => NextResponse.json(data))
      .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
  });
}
