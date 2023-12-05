import { db } from "@/lib/db";
import { getFood } from "@/actions/get-food";
import { getFavorites } from "@/actions/get-favorites";
import getCurrentUser from "@/utils/getCurrentUser";

import SearchInput from "@/components/SearchInput";
import FoodList from "../../(routes)/(root)/_components/FoodList";
import Categories from "../../(routes)/(root)/_components/Categories";

interface RootPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}
const RootPage = async ({ searchParams }: RootPageProps) => {
  const currentUser = await getCurrentUser();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const food = await getFood({
    userId: currentUser?.id,
    ...searchParams,
  });

  const favorites = await getFavorites(currentUser?.id || "");

  return (
    <>
      <div className="mb-3 block md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-5 pb-4">
        <Categories items={categories} />
        <FoodList
          items={food}
          favorites={favorites.map((favorite) => favorite.food)}
          currentUserId={currentUser?.id}
        />
      </div>
    </>
  );
};

export default RootPage;
