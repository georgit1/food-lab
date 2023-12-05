import getCurrentUser from "@/utils/getCurrentUser";
import { SidebarRoutes } from "./SidebarRoutes";
import { Logo } from "../../../components/Logo";

export const Sidebar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex h-full w-full flex-col px-2">
        <SidebarRoutes currentUser={currentUser} />
      </div>
    </div>
  );
};
