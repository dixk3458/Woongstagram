import { dislikePost, likePost } from '@/service/post';
import { authOptions } from '@/utils/authOptions';
import { sessionWithUser } from '@/utils/session';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

// 데이터를 업데이트하는 HTTP 요청은 PUT
export async function PUT(req: NextRequest) {
  // 로그인한 사용자가 클릭을하면 서버에게 요청을해야한다.
  // 요청을 받은 서버는 Sanity에 접근해
  // 데이터를 조작하고
  // 응답

  return sessionWithUser(async user => {
    // JSON 형태의 요청을 오브젝트로 만들고 풀었다.
    const { postid, liked } = await req.json();

    //   잘못된 요청
    if (!postid || liked == null) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    const request = liked ? likePost : dislikePost;

    // 세션의 User데이터안에는 데이터가 부족하기때문에,
    // 앞서 userid를 세션에 User를 추가할때 추가해준것처럼
    // usertokenid도 만들어 추가해주자.

    return request(postid, user.usertokenid)
      .then(data => NextResponse.json(data))
      .catch(error => new NextResponse(JSON.stringify(error), { status: 500 }));
  });
}
