import { AuthUser } from '@/model/user';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default async function withSessionUser(
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication error', { status: 401 });
  }

  return handler(user);
}
