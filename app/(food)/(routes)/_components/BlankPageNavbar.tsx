import { Logo } from '@/components/Logo';
import { NavbarRoutes } from '@/components/navbar-routes';

export const BlankPageNavbar = () => {
  return (
    // TODO - z-index
    <div className='p-4 border-b h-full flex items-center bg-white shadow-sm z-9999'>
      <Logo />
      <NavbarRoutes />
    </div>
  );
};
