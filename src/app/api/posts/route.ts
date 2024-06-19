import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getFollowingPostsOf } from '@/service/posts';
import { NextResponse } from 'next/server';
import withSessionUser from '@/util/session';

export async function GET() {
  return withSessionUser(async user => {
    return getFollowingPostsOf(user.userName).then(data =>
      NextResponse.json(data)
    );
  });
}
