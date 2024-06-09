import { searchUsers } from '@/service/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('keyword');

  // keyword가 비어있을 수 있다.

  return searchUsers(keyword).then(data => NextResponse.json(data));
}
