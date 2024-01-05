'use client';

import Link from 'next/link';
import HomeIcon from '../UI/Icons/HomeIcon';
import HomeFillIcon from '../UI/Icons/HomeFillIcon';
import SearchIcon from '../UI/Icons/SearchIcon';
import SearchFillIcon from '../UI/Icons/SearchFillIcon';
import NewIcon from '../UI/Icons/NewIcon';
import NewFillIcon from '../UI/Icons/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from '../UI/Button/ColorButton';
import { signIn, signOut, useSession } from 'next-auth/react';
import Avatar from '../Avatar/Avatar';

const links = [
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
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/">
        <h1 className="text-3xl font-bold">Woongstagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 p-4">
          {links.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{href === pathname ? clickedIcon : icon}</Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.userid}`}>
                <Avatar image={user.image} />
              </Link>
            </li>
          )}
          <li>
            {session ? ( //세션 정보가 있으면 signOut()호출
              <ColorButton text="Sign out" onClick={() => signOut()} />
            ) : (
              //세션 정보가 없으면 signIn()호출
              <ColorButton text="Sign in" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
