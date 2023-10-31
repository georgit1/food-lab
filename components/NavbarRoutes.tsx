'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Heart, LogOutIcon, PlusCircle } from 'lucide-react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';
import toast from 'react-hot-toast';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import SearchInput from './SearchInput';
import { Category, Food } from '@prisma/client';
import FavoritesTable from './FavoritesTable';
import { useEffect, useState } from 'react';

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

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  categoryId: z.string({
    required_error: 'Please select a category.',
  }),
});

export const NavbarRoutes = ({ options, favorites }: NavbarRoutesProps) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentUser = useSession().data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isSmallScreen = windowWidth <= 768;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', categoryId: '' },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/food', values);
      router.push(`/manage/${response.data.id}`);
      toast.success('Food added');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {isHome && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}

      <div className='flex gap-x-6 ml-auto'>
        {/* Add Food */}
        {isHome && (
          <Dialog>
            <DialogTrigger asChild>
              {/* TODO - login alert on signed out */}
              {/* TODO - indicate loading on redirecting to id-page when add food*/}
              {isSmallScreen ? (
                <Button className='fixed bottom-6 right-6 p-4 h-auto shadow-md rounded-full'>
                  <PlusCircle className='h-5 w-5' />
                </Button>
              ) : (
                <Button
                  variant='outline'
                  className='p-2.5 h-auto rounded-full md:static lg:rounded-md'
                >
                  <PlusCircle className='h-5 w-5' />
                  <span className='hidden lg:inline-block ml-2'>Add Food</span>
                </Button>
              )}
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add a new food</DialogTitle>
                <DialogDescription>
                  Fill out the fields to insert nutrition data.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel className='text-primary-600 font-semibold'>
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder='Enter title'
                            {...field}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='categoryId'
                    render={({ field }) => (
                      <FormItem className=' w-full mt-3'>
                        <FormLabel className='text-primary-600 font-semibold'>
                          Category
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a Category' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {options?.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex items-center gap-x-2 mt-6 float-right'>
                    <Button disabled={isSubmitting} type='submit'>
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}

        {/* Favorites */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant='outline'
              className='rounded-full p-2 bg-primary-50 hover:bg-primary-100 border-primary-200 transition duration-300'
            >
              <Heart className='text-primary-600' fill='#0284c7' />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle className='text-primary-600'>Favorites</DialogTitle>
              <DialogDescription className='text-primary-400'>
                Browse your favorite foods
              </DialogDescription>
            </DialogHeader>
            <FavoritesTable favorites={favorites} />
            {/* <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter> */}
          </DialogContent>
        </Dialog>

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
                // () => signOut()
                // () => {
                //   signOut(), router.push('/sign-in');
                // }

                currentUser?.email
                  ? // TODO
                    // ? () => signOut().then(() => toast.success('Logged out'))
                    // TODO - on sign out from "/" -> to many redirects
                    () => signOut()
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
