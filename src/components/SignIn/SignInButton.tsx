'use client';

import { InferGetServerSidePropsType } from 'next';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { ClientSafeProvider, LiteralUnion, signIn } from 'next-auth/react';
import { getServerSideProps } from 'next/dist/build/templates/pages';
import ColorButton from '../UI/Button/ColorButton';

type Props = {
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | {};
  callbackUrl: string;
};

export default function SignInButton({ providers, callbackUrl }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {Object.values(providers).map(({ name, id }) => (
        <li key={name}>
          <ColorButton
            text={`${name} 계정으로 로그인`}
            onClick={() => signIn(id, { callbackUrl }, { prompt: 'login' })}
            size="large"
          />
        </li>
      ))}
    </ul>
  );
}
