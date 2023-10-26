import { getFavorites } from '@/actions/get-favorites';
import { Logo } from '@/components/Logo';
import { NavbarRoutes } from '@/components/NavbarRoutes';
import getCurrentUser from '@/lib/getCurrentUser';

export const BlankPageNavbar = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites(currentUser?.id || '');

  return (
    // TODO - z-index
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm z-9999'>
      <Logo />
      <NavbarRoutes favorites={favorites.map((favorite) => favorite.food)} />
    </div>
  );
};
