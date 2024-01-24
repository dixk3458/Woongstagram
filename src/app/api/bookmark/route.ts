import { addBookmark, removeBookmark } from '@/service/user';
import { sessionWithUser } from '@/utils/session';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  return sessionWithUser(async user => {
    const { postid, bookmark } = await req.json();

    if (!postid || bookmark == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const request = bookmark ? addBookmark : removeBookmark;

    return request(user.usertokenid, postid)
      .then(res => NextResponse.json(res))
      .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
  });
}
