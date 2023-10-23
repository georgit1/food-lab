'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      height={130}
      width={130}
      alt='logo'
      src='/logo.svg'
      className='cursor-pointer'
    />
  );
};
