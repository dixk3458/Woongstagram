import SignInButton from '@/components/SignIn/SignInButton';
import { authOptions } from '@/utils/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export const metadata: Metadata = {
  title: 'Signin',
  description: 'Signin or Login to follow',
};

export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  // 서버 상에서 session에 대한 정보를 가져온다.
  const session = await getServerSession(authOptions);

  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = (await getProviders()) ?? {};

  // providers를 이용해  버튼을 구성해야하는데,
  // 버튼은 클릭이벤트가 발생해야한다 . 즉  클라이언트 컴포넌트이기때문에
  // 따로 정의해주자.

  return (
    <section className="flex flex-col items-center  mt-24">
      <SignInButton providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
