import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import SearchInput from '@/components/SearchInput';
import { getFood } from '@/actions/get-food';
import FoodList from '@/components/FoodList';

import Categories from '@/app/(dashboard)/(routes)/_components/Categories';

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser.email) return redirect('/');

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const food = await getFood({
    userId: currentUser.id,
    ...searchParams,
  });

  return (
    <>
      <div className='px-6 pt-6 md:hidden md:mb-0 block'>
        <SearchInput />
      </div>
      <div className='p-6 space-y-5'>
        <Categories items={categories} />
        <FoodList items={food} />
      </div>
    </>
  );
};

export default SearchPage;
