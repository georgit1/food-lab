import getCurrentUser from '@/utils/getCurrentUser';
import { SidebarRoutes } from './SidebarRoutes';
import { Logo } from '../../../components/Logo';

export const Sidebar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm'>
      <div className='p-6'>
        <Logo />
      </div>
      <div className='flex flex-col w-full h-full px-2'>
        <SidebarRoutes currentUser={currentUser} />
      </div>
    </div>
  );
};
