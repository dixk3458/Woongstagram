import { searchUser } from '@/service/user';
import { NextResponse } from 'next/server';

// 별도의 Request를 제공하지 않았고 그것을 기반으로 다른 행동을 하지 않기때문에,
// 정적인 코드는 SSG로 행동을한다.

export const dynamic = 'force-dynamic';

export async function GET() {
  // keyword가 없을때 사용되는 api route이다.
  // 모든 데이터를 반환해주자.
  return searchUser().then(data => NextResponse.json(data));
}
