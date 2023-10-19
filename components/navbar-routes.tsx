'use client';

import { usePathname } from 'next/navigation';
import { LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import getCurrentUser from '@/lib/getCurrentUser';
// import { isTeacher } from "@/lib/teacher";

// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  // TODO
  // const { userId } = useAuth();
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

        {/* TODO */}
        {/* <UserButton afterSignOutUrl='/' /> */}
      </div>
    </>
  );
};
