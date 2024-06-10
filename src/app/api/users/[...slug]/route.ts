import {
  getBookmarkedPostsOf,
  getLikedPostsOf,
  getPostsOf,
} from '@/service/posts';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const slug = context.params.slug;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [userName, query] = slug;

  // query에 따라서 다른 요청

  let request = getPostsOf;

  if (query === 'bookmarked') {
    request = getBookmarkedPostsOf;
  } else if (query === 'liked') {
    request = getLikedPostsOf;
  }

  return request(userName).then(data => NextResponse.json(data));
}
