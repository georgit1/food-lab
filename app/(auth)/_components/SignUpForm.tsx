'use client';

import * as z from 'zod';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import AuthSocialButton from './AuthSocialButton';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email(),
  password: z.string().min(1, { message: 'password is required' }).min(8, {
    message: 'Password must be at least 8 characters long',
  }),
});

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [session?.status, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const res = await axios.post('/api/register', values).then(() =>
        signIn('credentials', {
          ...values,
          redirect: false,
        })
      );

      if (res?.error) {
        toast.error('Invalid credentials!');
      }

      if (res?.ok && !res?.error) {
        router.push('/');
      }

      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('Error during sign-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const socialAction = async (action: string) => {
    try {
      setIsLoading(true);

      const res = await signIn(action, { redirect: false });

      if (res?.error) {
        toast.error('Invalid credentials!');
      }

      if (res?.ok) {
        router.push('/');
      }

      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      console.log('Error during sign-in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div
        className='
        bg-white
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        '
      >
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary-600 font-semibold'>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Enter your name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary-600 font-semibold'>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Enter your email'
                      type='email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-primary-600 font-semibold'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Enter your password'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                type='submit'
                className='w-full'
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>

        <div className='mt-6'>
          <div className='relative'>
            <div
              className='
                absolute 
                inset-0 
                flex 
                items-center
              '
            >
              <div className='w-full border-t border-gray-300' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='bg-white px-2 text-gray-500'>
                or continue with
              </span>
            </div>
          </div>

          <div className='mt-6 flex gap-2'>
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div
          className='
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          '
        >
          <div>Already have an account?</div>
          <div
            onClick={() => router.push('/sign-in')}
            className='underline cursor-pointer'
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
