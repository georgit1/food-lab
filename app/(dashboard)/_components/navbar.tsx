import { NavbarRoutes } from '@/components/navbar-routes';
import { MobileSidebar } from './MobileSidebar';
import { db } from '@/lib/db';

export const Navbar = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm'>
      <MobileSidebar />
      <NavbarRoutes
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </div>
  );
};
