import Signin from '@/components/Signin';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

type Props = {
  searchParams: { callbackUrl: string };
};

export default async function SignInPage({
  searchParams: { callbackUrl: callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = (await getProviders()) ?? {};

  // 동적인 클릭 이벤트를 처리하기 위해선 Client 컴포넌트를 만들어야한다

  return (
    <section>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
