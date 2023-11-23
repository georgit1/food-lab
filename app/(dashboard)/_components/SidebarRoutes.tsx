'use client';

import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import {
  Compass,
  UserCircle,
  LogIn,
  LogOut,
  Calculator,
  Banana,
  Soup,
  Salad,
} from 'lucide-react';

import { SidebarItem } from './SidebarItem';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/utils/utils';
import { AccordionContent } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import AccordionButton from './AccordionButton';
import { useState } from 'react';

interface SidebarRoutesProps {
  currentUser: User | null;
}

const browseRoutes = [
  {
    icon: Banana,
    label: 'Food',
    href: '/',
  },
  {
    icon: Salad,
    label: 'Meals',
    href: '/meals',
  },
];

const routes = [
  // {
  //   icon: Compass,
  //   label: 'Browse',
  //   href: '/',
  // },
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
  const [isExpanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const isBrowseActive = pathname === '/' || pathname === '/meals';

  const handleExpand = () => {
    setExpanded((exp) => !exp);
  };

  return (
    <>
      {/* Browse accordion */}
      <Accordion type='single' collapsible>
        <AccordionItem value='food' className='border-none'>
          <AccordionTrigger
            onClick={handleExpand}
            className={cn(
              'text-neutral-700 rounded-md p-0 pr-2 mb-1 hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
              isBrowseActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
            )}
          >
            <span className='flex items-center gap-x-2 py-4 pl-6'>
              <Compass
                size={22}
                className={cn(
                  'text-slate-500',
                  isBrowseActive && 'text-sky-700'
                )}
              />
              Browse
            </span>
            {/* <SidebarItem key='browse' icon={Compass} label='Browse' href='/' /> */}
          </AccordionTrigger>
          <AccordionContent className='text-neutral-700 px-2'>
            {browseRoutes.map((route) => (
              <AccordionButton
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* routes */}
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

      {/* Login/Logout */}
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
