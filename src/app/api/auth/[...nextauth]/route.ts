import { authOptions } from '@/utils/authOptions';
import NextAuth, { NextAuthOptions } from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
