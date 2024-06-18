import NewPost from '@/components/NewPost';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function NewPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/signin');
  }

  return (
    <section className="w-full max-w-xl">
      <NewPost user={user} />
    </section>
  );
}
