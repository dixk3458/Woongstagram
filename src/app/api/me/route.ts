import { NextResponse } from 'next/server';
import { getUserByUserId } from '@/service/user';
import { sessionWithUser } from '@/utils/session';

export async function GET() {
  // 원래는 사용자가 요청할때 Request header에 있는 쿠키에 대한 데이터를
  // 분석해서 사용자가 누구인지 등 세션정보를 가져와야한다.
  // 하지만 NextAuth가 자동적으로 해주기때문에
  // 따로 설정해주지 않아도 된다.

  return sessionWithUser(async user => {
    if (!user) {
      return new NextResponse('Authentication Error', { status: 401 });
    }
    //http status 401 에러는 허용되지 않은 사용자에대한 에러이다.

    // 유효한 사용자라면 Sanity에서 데이터를 가져와야한다.
    // 따로 모듈을 만들어 데이터를 얻은 후 응답을해주자.

    return getUserByUserId(user.userid).then(data => NextResponse.json(data));
  });

  // 사용자도 없는데 요청을 하면안된다.
}
