import { addUser } from '@/service/user';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      // 서버에서 로그인에 성공하면 user:{id,name,email,image}를 준다.
      // 이 데이터를 이용해 Sanity에 저장해야한다.
      // 하지만 userid가 없기에 조작을해줘야한다.

      if (!email) {
        return false;
      }

      addUser({
        // id는 계정의 고유한 id이다.
        id: id,
        userid: email.split('@')[0],
        name: name || '',
        email: email,
        image: image,
      });
      return true;
    },
    async session({ session, token }) {
      const user = session?.user;
      // Sanity에 필요한 userid 값을 추가해줄것이다.

      // 카카오 사용자 데이터 가져오기 실패 ㅠㅠ 나중에 구현하자
      // 임시로 고유 세션 정보를 이용해 email,userid 구현
      if (!user.email) {
        user.email = token.sub as string;
      }

      if (user) {
        session.user = {
          ...user,
          userid: user.email?.split('@')[0] || '',
          usertokenid: token.usertokenid as string,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.usertokenid = user.id;
      }
      return token;
    },
  },
};
