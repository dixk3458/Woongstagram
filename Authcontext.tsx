'use client';

// 로그인한 사용자 정보를 가지고 있는 context를 생성
// context안에 SessionProvider가 실제 로그인한 사용자 데이터를 가짐

// context는 공통의 상태를 관리해준다. 즉 client측에서 실행해야한다.

import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}


// Session Provider는 로그인에 대한 세션 정보를 얻어오기위해 Session Provider를 사용
// 세션 정보를 접근하기 위해서는 useSession이라는 리액트 훅을 사용해야 접근 가능

// 로그인 사용자 정보는 애플리케이션 전체적으로 관리되어야함으로
// layout에서 감싸주자.