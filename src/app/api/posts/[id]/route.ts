import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getPost } from '@/service/posts';
import withSessionUser from '@/util/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: { id: string };
};

export async function GET(_: NextRequest, context: Context) {
  return withSessionUser(async () => {
    const postId = context.params.id;

    return getPost(postId).then(res => NextResponse.json(res));
  });
}
