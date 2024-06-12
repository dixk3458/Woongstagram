import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Woongstagram',
    template: 'Woongstagram %s',
  },
  description: 'Woongstagram 서비스를 이용해 일상을 공유해보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="bg-neutral-50 flex flex-col w-full h-full overflow-auto mx-auto">
        <div id="portal" />
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-center grow py-2 mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
      </body>
    </html>
  );
}
