import { NavbarRoutes } from '@/components/NavbarRoutes';
import { MobileSidebar } from './MobileSidebar';
import { db } from '@/lib/db';
import { getFavorites } from '@/actions/get-favorites';
import getCurrentUser from '@/lib/getCurrentUser';
import { getFood } from '@/actions/get-food';

export const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // const food = await getFood({ userId: currentUser?.id || '' });
  const favorites = await getFavorites(currentUser?.id || '');

  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        favorites={favorites.map((favorite) => favorite.food)}
      />
    </div>
  );
};
