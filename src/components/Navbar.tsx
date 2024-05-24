'use client';

import Link from 'next/link';
import HomeIcon from './ui/HomeIcon';
import HomeFillIcon from './ui/HomeFillIcon';
import SearchIcon from './ui/SearchIcon';
import SearchFillIcon from './ui/SearchFillIcon';
import NewIcon from './ui/NewIcon';
import NewFillIcon from './ui/NewFillIcon';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';

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
          <ColorButton text="Sign in" onClick={() => {}} />
        </ul>
      </nav>
    </div>
  );
}
