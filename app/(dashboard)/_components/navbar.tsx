import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { getFavorites } from "@/actions/get-favorites";

import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "@/components/NavbarRoutes";

export const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const favorites = await getFavorites(currentUser?.id || "");

  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
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
