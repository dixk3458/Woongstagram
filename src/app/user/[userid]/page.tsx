import UserPosts from '@/components/User/UserPosts';
import UserProfile from '@/components/User/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';

type Props = {
  params: { userid: string };
};

export default async function UserPage({ params }: Props) {
  // 서버에서 미리 렌더링하기 어려운 페이지이다.
  // 왜냐하면 모든 사용자에대한 페이지를 준비할수없다.
  // SSR방식을 이용해 요청을해 Server에서 준비할수도있겠지만, 상당히 많은 자원을 소모할것이다.

  // 클라이언트 컴포넌트로 진행하자.

  // 물론 페이지 전체를 클라이언트 컴포넌트로 진행하는것이 아니라,
  // 적절하게 혼합해서 사용하자.

  // 즉 SSR 방식을 이용해 간단한 사용자에대한 정보를 보여주고
  // 밑에 postCard와 같은 컴포넌트는 Client 컴포넌트로 생성

  // userid를 이용해 API Route를 할것이기에
  // userid가 동적으로 전달되는데 그것을 저장하자.

  const user = await getUserForProfile(params.userid);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full flex flex-col">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
