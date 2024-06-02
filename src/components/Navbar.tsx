'use client';

import Link from 'next/link';
import HomeIcon from './ui/icon/HomeIcon';
import HomeFillIcon from './ui/icon/HomeFillIcon';
import SearchIcon from './ui/icon/SearchIcon';
import SearchFillIcon from './ui/icon/SearchFillIcon';
import NewIcon from './ui/icon/NewIcon';
import NewFillIcon from './ui/icon/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from './Avatar';

// 추상화 시키면 유지보수성++
const menus = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
  },
];

export default function Navbar() {
  const pathName = usePathname(); // client component 훅
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Woongstagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 p-4">
          {menus.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.userName}`}>
                <Avatar image={user.image} size="small" highlight={true} />
              </Link>
            </li>
          )}
          <li>
            {!session ? (
              <ColorButton text="Sign in" onClick={() => signIn()} />
            ) : (
              <ColorButton text="Sign out" onClick={() => signOut()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
