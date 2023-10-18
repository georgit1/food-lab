'use client';

import { BarChart, Compass, Layout, Apple } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './sidebar-item';

// import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Compass,
    label: 'Browse',
    href: '/',
  },
  // {
  //   icon: Compass,
  //   label: 'Browse',
  //   href: '/search',
  // },
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
