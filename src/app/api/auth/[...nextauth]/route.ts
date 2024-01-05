import NextAuth, { NextAuthOptions } from 'next-auth';
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
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
