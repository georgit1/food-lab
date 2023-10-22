import { BlankPageNavbar } from './(routes)/_components/BlankPageNavbar';

const ManageFoodLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full '>
      <div className='h-[80px] fixed inset-y-0 w-full'>
        <BlankPageNavbar />
      </div>
      <main className='pt-[80px] h-full max-w-7xl mx-auto'>{children}</main>
    </div>
  );
};

export default ManageFoodLayout;
