import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from '@/service/post';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: { slug: string[] };
};

export async function GET(_: NextRequest, { params }: Props) {
  const { slug } = params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [userid, query] = slug;

  let request = getPostsOf;

  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query == 'liked') {
    request = getLikedPostsOf;
  }

  return request(userid).then(data => NextResponse.json(data));
}
