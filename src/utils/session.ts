import { AuthUser } from '@/model/user';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from './authOptions';

export async function sessionWithUser(
  handler: (user: AuthUser) => Promise<NextResponse>
): Promise<NextResponse> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new NextResponse('Authentication Error', { status: 401 });
  }

  return handler(user);
}
