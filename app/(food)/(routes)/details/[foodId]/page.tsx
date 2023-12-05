import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { calculateNutrientRequirements } from "@/utils/calcPersonalNutrients";

import DetailsHeader from "../_components/DetailsHeader";
import FoodDetailsGrid from "../_components/FoodDetailsGrid";

const FoodDetailsPage = async ({ params }: { params: { foodId: string } }) => {
  const currentUser = await getCurrentUser();

  const food = await db.food.findUnique({
    where: {
      id: params.foodId,
    },
    include: {
      category: true,
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  if (!food) {
    return redirect("/");
  }

  const requiredNutrients = calculateNutrientRequirements(
    currentUser?.pal as number,
    currentUser?.rmr as number,
    currentUser?.age as number,
    currentUser?.gender as Gender,
    currentUser?.weight as number,
  );

  return (
    <>
      <DetailsHeader />

      <FoodDetailsGrid
        foodData={food}
        currentUsersId={currentUser?.id || ""}
        requiredNutrients={requiredNutrients}
      />
    </>
  );
};

export default FoodDetailsPage;
