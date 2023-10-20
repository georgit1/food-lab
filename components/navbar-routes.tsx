'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LogOut, LogOutIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import getCurrentUser from '@/lib/getCurrentUser';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
// import { isTeacher } from "@/lib/teacher";

// import { SearchInput } from "./search-input";

const getInitials = (fullName: string) => {
  const nameParts = fullName.split(' ');

  if (nameParts.length === 0) {
    return '';
  }

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }

  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial = nameParts[nameParts.length - 1]
    .charAt(0)
    .toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
};

export const NavbarRoutes = () => {
  const currentUser = useSession().data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  return (
    <>
      <div className='hidden md:block'>{/* <SearchInput /> */}</div>
      <div className='flex gap-x-8 ml-auto'>
        {isHome && (
          <Link href='/create'>
            <Button size='sm'>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add Food
            </Button>
          </Link>
        )}

        {/* TODO */}
        <Popover>
          <PopoverTrigger>
            <Avatar className='ring ring-primary-600 ring-offset-2'>
              <AvatarImage src={currentUser?.image || ''} />
              <AvatarFallback>
                {getInitials(currentUser?.name || '')}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className='mt-2 mr-2'>
            {currentUser?.email && (
              <>
                <div className='px-2 py-1.5 text-sm font-normal'>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>
                      {currentUser?.name}
                    </p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
                <Separator
                  aria-orientation='horizontal'
                  className='-mx-1 my-1 h-px bg-muted'
                />
              </>
            )}
            <Button
              variant='ghost'
              onClick={
                currentUser?.email
                  ? () => signOut()
                  : () => router.push('/sign-in')
              }
              className='w-full flex justify-start'
            >
              <LogOutIcon className='h-4 w-4 mr-2' />
              {currentUser?.email ? 'Log out' : 'Log in'}
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
