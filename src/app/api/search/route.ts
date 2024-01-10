import { searchUser } from '@/service/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // keyword가 없을때 사용되는 api route이다.
  // 모든 데이터를 반환해주자.
  return searchUser().then(data => NextResponse.json(data));
}
