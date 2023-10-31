'use client';

import { BarChart, Compass, Layout, Apple, UserCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './SidebarItem';

const routes = [
  {
    icon: Compass,
    label: 'Browse',
    href: '/',
  },
  {
    icon: UserCircle,
    label: 'User Profile',
    href: '/profile',
  },
];

export const SidebarRoutes = () => {
  // const pathname = usePathname();

  return (
    <div className='flex flex-col w-full'>
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
