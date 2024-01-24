import NewPost from '@/components/Post/NewPost';
import { authOptions } from '@/utils/authOptions';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return <NewPost user={session.user} />;
}
