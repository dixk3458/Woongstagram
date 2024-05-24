'use client';

import Link from 'next/link';
import HomeIcon from './ui/HomeIcon';
import HomeFillIcon from './ui/HomeFillIcon';
import SearchIcon from './ui/SearchIcon';
import SearchFillIcon from './ui/SearchFillIcon';
import NewIcon from './ui/NewIcon';
import NewFillIcon from './ui/NewFillIcon';
import { usePathname } from 'next/navigation';

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

  return (
    <div>
      <Link href="/">
        <h1>Woongstagram</h1>
      </Link>
      <nav>
        <ul>
          {menus.map(({ href, icon, clickedIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? clickedIcon : icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
