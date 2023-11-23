import { BlankPageNavbar } from './(routes)/_components/BlankPageNavbar';

const ManageFoodLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full '>
      <div className='h-[80px] fixed inset-y-0 w-full z-50'>
        <BlankPageNavbar />
      </div>
      <main className='pt-[104px] p-6 h-full max-w-7xl mx-auto'>
        {children}
      </main>
    </div>
  );
};

export default ManageFoodLayout;
