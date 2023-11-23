import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';
import SearchInput from '@/components/SearchInput';
import { getFood } from '@/actions/get-food';
import FoodList from '@/app/(dashboard)/(routes)/(root)/_components/FoodList';

import Categories from '@/app/(dashboard)/(routes)/(root)/_components/Categories';
import { getFavorites } from '@/actions/get-favorites';

interface RootPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const RootPage = async ({ searchParams }: RootPageProps) => {
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

export default RootPage;

// TODO
// prevent creating food with no main nutrients -> error in details page
// update context on add or delete food on database
// signal user to add profile before go on
// double check all personal nutrients with excel
// check vitamins barchart
// on page switch from sign-in to sign-up without open modal
// tailwind sort classes
// - check for google login
// - check that api works correctly for isCreator and non isCreator
