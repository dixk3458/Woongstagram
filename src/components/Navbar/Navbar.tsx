'use client';

import Link from 'next/link';
import HomeIcon from '../UI/Icons/HomeIcon';
import HomeFillIcon from '../UI/Icons/HomeFillIcon';
import SearchIcon from '../UI/Icons/SearchIcon';
import SearchFillIcon from '../UI/Icons/SearchFillIcon';
import NewIcon from '../UI/Icons/NewIcon';
import NewFillIcon from '../UI/Icons/NewFillIcon';
import { usePathname } from 'next/navigation';

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

  return (
    <>
      <Link href="/">
        <h1>Woongstagram</h1>
      </Link>
      <nav>
        <ul>
          {links.map(({ href, icon, clickedIcon }) => (
            <li>
              <Link href={href}>{href === pathname ? clickedIcon : icon}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
