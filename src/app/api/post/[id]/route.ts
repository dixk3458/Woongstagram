import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/service/post';
import { sessionWithUser } from '@/utils/session';

type Props = {
  params: { id: string };
};

// 요청을할때는 request를 해야하나보다,
// request없이 params를 받아올경우에 못읽는다.

export async function GET(_: NextRequest, { params }: Props) {
  // 어떤 post의 데이터를 요구하는지 id를 알아야한다.
  // id는 Next js가 자동으로 호출해주는 slug를 통해 알수있다.
  return sessionWithUser(async () => {
    return getPostById(params.id).then(data => NextResponse.json(data));
  });
}
