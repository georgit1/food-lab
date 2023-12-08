import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="z-50 h-full">
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="mx-auto h-full max-w-7xl p-6 pt-[104px] md:pl-[248px]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
