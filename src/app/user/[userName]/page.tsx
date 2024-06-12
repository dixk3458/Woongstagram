import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { cache } from 'react';

type Context = {
  params: { userName: string };
};

// cache는 서버 컴포넌트에서 사용가능하며
// 가져온 데이터나 연산의 결과를 캐싱하게 해준다.
// 같은 데이터를 이용한 서버 요청이 발생하면, 재요청하지 않고 캐싱된 데이터 사용

// 즉 동일한 userName을 이용하면 getUserForProfile() 캐싱데이터 사용
const getUser = cache(async (userName: string) => getUserForProfile(userName));

export default async function UserPage({ params: { userName } }: Context) {
  const user = await getUser(userName);
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full border-b border-neutral-300">
        <UserProfile user={user} />
      </div>
      <div className="w-full grow">
        <UserPosts user={user} />
      </div>
    </section>
  );
}

export async function generateMetadata({
  params: { userName },
}: Context): Promise<Metadata> {
  const user = await getUser(userName);

  return {
    title: `${user.name} @ ${user.userName} Woongstagram photos`,
    description: `${user.name}'의 posts`,
  };
}
