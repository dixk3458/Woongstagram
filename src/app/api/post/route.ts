import { NextRequest, NextResponse } from 'next/server';
import { createPost, getFollowingPostsOf } from '@/service/post';
import { sessionWithUser } from '@/utils/session';

export async function GET() {
  return sessionWithUser(async user => {
    // 유효성 검사를 통과하면 서버에서 Sanity 데이터를 가져와야한다.
    return getFollowingPostsOf(user.userid).then(data =>
      NextResponse.json(data)
    );
  });
}

export async function POST(req: NextRequest) {
  return sessionWithUser(async user => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file') as Blob;

    if (!text || !file) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    return createPost(user.usertokenid, text, file).then(data =>
      NextResponse.json(data)
    );
  });
}
