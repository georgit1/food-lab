'use client';

// TODO

import { UserButton, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
// import { isTeacher } from "@/lib/teacher";

// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <>
      <div className='hidden md:block'>{/* <SearchInput /> */}</div>
      <div className='flex gap-x-2 ml-auto'>
        {isHome && (
          <Link href='/create'>
            <Button size='sm'>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add Food
            </Button>
          </Link>
        )}

        <UserButton afterSignOutUrl='/' />
      </div>
    </>
  );
};
