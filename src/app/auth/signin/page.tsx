import Signin from '@/components/Signin';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

type Props = {
  searchParams: { callbackUrl: string };
};

export const metadata: Metadata = {
  title: 'Sign in',
  description:
    '계정을 만들거나 Woongstagram에 로그인하여 사람들과 관심사를 공유해보세요.',
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
    <section className="flex justify-center items-center">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
