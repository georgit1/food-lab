'use client';

import { useEffect, useState } from 'react';
import { Category, Food } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Heart, LogOutIcon, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import SearchInput from './SearchInput';
import { useModal, ModalType } from '@/hooks/useModalStore';
import Link from 'next/link';

type FoodWithCategory = Food & { category: Category };

interface NavbarRoutesProps {
  options?: { label: string; value: string }[];
  favorites: FoodWithCategory[];
}

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

export const NavbarRoutes = ({ options, favorites }: NavbarRoutesProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentUser = useSession().data?.user;
  const { onOpen } = useModal();
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  const isSmallScreen = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onActionCreate = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { options });
  };

  const onActionFavorites = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { favorites });
  };

  return (
    <>
      {isHome && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}

      <div className='flex gap-x-6 ml-auto'>
        {/* Create Food */}
        {/* TODO - indicate loading on redirecting to id-page when add food*/}
        {isHome &&
          (isSmallScreen ? (
            <Button
              className='fixed bottom-6 right-6 p-4 h-auto shadow-md rounded-full'
              onClick={
                currentUser?.email
                  ? (e) => onActionCreate(e, 'createFood')
                  : () => router.push('/sign-in')
              }
            >
              <PlusCircle className='h-5 w-5' />
            </Button>
          ) : (
            <Button
              variant='outline'
              className='p-2.5 h-auto rounded-full md:static lg:rounded-md'
              onClick={
                currentUser?.email
                  ? (e) => onActionCreate(e, 'createFood')
                  : () => router.push('/sign-in')
              }
            >
              <PlusCircle className='h-5 w-5' />
              <span className='hidden lg:inline-block ml-2'>Add Food</span>
            </Button>
          ))}

        {/* Favorites */}
        <Button
          variant='outline'
          className='rounded-full p-2 bg-primary-50 hover:bg-primary-100 border-primary-200 transition duration-300'
          onClick={(e) => onActionFavorites(e, 'favorites')}
        >
          <Heart className='text-primary-600' fill='#0284c7' />
        </Button>

        {/* Avatar */}
        <Popover>
          <PopoverTrigger>
            <Avatar className='ring ring-primary-600 ring-offset-2'>
              <AvatarImage src={currentUser?.image || '/profile.jpg'} />
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
            {/* <Link href='/test'>sign in</Link> */}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
