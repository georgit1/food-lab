'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LogOutIcon, PlusCircle } from 'lucide-react';
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

interface NavbarRoutesProps {
  options: { label: string; value: string }[];
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

export const NavbarRoutes = ({ options }: NavbarRoutesProps) => {
  const currentUser = useSession().data?.user;
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === '/';

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
      <div className='hidden md:block'>{/* <SearchInput /> */}</div>
      <div className='flex gap-x-8 ml-auto'>
        {isHome && (
          <Dialog>
            <DialogTrigger asChild>
              {/* TODO - button lower right corner on mobile */}
              {/* TODO - lgoin alert on signed out */}
              <Button variant='outline'>
                <PlusCircle className='h-4 w-4 mr-2' />
                Add Food
              </Button>
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
                            {options.map((option) => (
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
                  ? // TODO
                    // ? () => signOut().then(() => toast.success('Logged out'))
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
