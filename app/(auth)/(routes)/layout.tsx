'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AuthLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  const params = usePathname();
  const signInPath = params.includes('/sign-in');

  return (
    <div
      className='
    flex
    min-h-full
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    '
    >
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <Image
          height='48'
          width='48'
          className='mx-auto w-auto'
          src='/logo.svg'
          alt='Logo'
        />
        <h2
          className='
          mt-6
          text-center
          text-3xl
          font-bold
          tracking-tight
          text-gray-900
        '
        >
          {signInPath ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>
      {children}
      {modal}
    </div>
  );
};

export default AuthLayout;
