'use client';

import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { Compass, UserCircle, LogIn, LogOut, Calculator } from 'lucide-react';

import { SidebarItem } from './SidebarItem';

interface SidebarRoutesProps {
  currentUser: User | null;
}

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
  {
    icon: Calculator,
    label: 'Meal Calculator',
    href: '/calculator',
  },
];

const loginRoute = {
  icon: LogIn,
  label: 'Login',
  href: '/sign-in',
};

const logoutRoute = {
  icon: LogOut,
  label: 'Logout',
};

export const SidebarRoutes = ({ currentUser }: SidebarRoutesProps) => {
  return (
    <>
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
      {currentUser?.id ? (
        <SidebarItem
          key={logoutRoute.label}
          icon={logoutRoute.icon}
          label={logoutRoute.label}
          variant='ghost'
          onLogout={() => signOut()}
          className='mt-auto'
        />
      ) : (
        <SidebarItem
          key={loginRoute.href}
          icon={loginRoute.icon}
          label={loginRoute.label}
          href={loginRoute.href}
          variant='ghost'
          className='mt-auto'
        />
      )}
    </>
  );
};
