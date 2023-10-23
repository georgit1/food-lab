'use client';

import qs from 'query-string';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Input } from './ui/input';
import { useDebounce } from '@/hooks/useDebounce';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get('categoryId');

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className='relative'>
      <Search className='h-4 w-4 absolute top-3 left-3 text-neutral-600 z-10' />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className='w-full md:w-[300px] pl-9 rounded-full bg-neutral-100 focus-visible:ring-neutral-200'
        placeholder='Search for a food'
      />
    </div>
  );
};

export default SearchInput;
