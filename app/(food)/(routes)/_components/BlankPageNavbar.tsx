import getCurrentUser from "@/utils/getCurrentUser";
import { getFavorites } from "@/actions/get-favorites";

import { Logo } from "@/components/Logo";
import { NavbarRoutes } from "@/components/NavbarRoutes";

export const BlankPageNavbar = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites(currentUser?.id || "");

  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <Logo />
      <NavbarRoutes favorites={favorites.map((favorite) => favorite.food)} />
    </div>
  );
};
