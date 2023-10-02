'use client';

import { BarChart, Compass, Layout, Apple } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItem } from './sidebar-item';

// import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const creatorRoutes = [
  {
    icon: Apple,
    label: 'Food',
    href: '/creator/food',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/creator/analytics',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isCreatorPage = pathname?.includes('/creator');

  const routes = isCreatorPage ? creatorRoutes : guestRoutes;

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
