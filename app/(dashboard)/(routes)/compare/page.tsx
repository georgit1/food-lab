import { Gender } from "@prisma/client";

import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { calculateNutrientRequirements } from "@/utils/calcPersonalNutrients";
import { getFavorites } from "@/actions/get-favorites";

import SplitScreen from "./_components/SplitScreen";
import CompareHeader from "./_components/CompareHeader";

const ComparePage = async () => {
  const currentUser = await getCurrentUser();

  const favorites = await getFavorites(currentUser?.id || "");

  const food = await db.food.findMany({
    where: {
      OR: [{ userId: currentUser?.id }, { isCreator: true }],
      mainNutrients: {
        some: {
          calories: {
            gt: 0,
          },
        },
      },
    },
    take: 5,
    include: {
      category: true,
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  const requiredNutrients = calculateNutrientRequirements(
    currentUser?.pal as number,
    currentUser?.rmr as number,
    currentUser?.age as number,
    currentUser?.gender as Gender,
    currentUser?.weight as number,
  );

  return (
    <div className="-mx-8">
      <CompareHeader />

      <SplitScreen
        favorites={favorites.map((favorite) => favorite.food)}
        requiredNutrients={requiredNutrients}
        foodData={food}
      />
    </div>
  );
};

export default ComparePage;
