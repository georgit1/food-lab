import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import SearchInput from '@/components/SearchInput';
import { getFood } from '@/actions/get-food';
import FoodList from '@/app/(dashboard)/(routes)/(root)/_components/FoodList';

import Categories from '@/app/(dashboard)/(routes)/(root)/_components/Categories';
import { getFavorites } from '@/actions/get-favorites';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const currentUser = await getCurrentUser();

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const food = await getFood({
    userId: currentUser?.id,
    ...searchParams,
  });

  // const favorites = await getFavorites(currentUser?.id || '');

  return (
    <>
      <div className='mb-3 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='space-y-5 pb-4'>
        <Categories items={categories} />
        <FoodList items={food} />
      </div>
    </>
  );
};

export default SearchPage;

// on page switch from sign-in to sign-up without open modal
// sign-in or sign-up meaning and correction in from
