import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import AuthContext from '@/context/Authcontext';
import SWRConfigContext from '@/context/SWRConfigContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Woongstagram',
    template: 'Wonngstagram | %s',
  },
  description: 'Woongstagram',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.className} lang="en">
      <head>
        <meta property="og:title" content="Woongstagram" />
        <meta property="og:type" content="SNS" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
      </head>
      <body className="bg-orange-50 w-full">
        <AuthContext>
          <header className="sticky top-0 z-10 shadow-md bg-amber-50">
            <div className="w-full max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-center pt-4 max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
