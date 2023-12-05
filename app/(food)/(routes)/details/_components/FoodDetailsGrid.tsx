import { WholeFoodWithCategory } from "@/types/types";
import { NutrientData } from "@/utils/calcPersonalNutrients";

import DataItem from "./DataItem";
import GeneralItem from "./GeneralItem";
import FoodDensityItem from "./FoodDensityItem";
import SubNutrientsItem from "./SubnutrientsItem";
import MainNutrientsItem from "./MainNutrientsItem";

interface FoodDetailsGridProps {
  foodData: WholeFoodWithCategory;
  currentUsersId: string;
  requiredNutrients: NutrientData;
}

const FoodDetailsGrid = ({
  foodData,
  currentUsersId,
  requiredNutrients,
}: FoodDetailsGridProps) => {
  return (
    <div className="grid-rows-[1fr, 0.3fr, 1fr] mb-2 mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
      <GeneralItem
        foodId={foodData.id}
        currentUserId={currentUsersId}
        foodCreator={foodData.userId}
        title={foodData.title}
        category={foodData.category.name}
        imageUrl={foodData.imageUrl || ""}
        preference={foodData.preference}
        isCreator={foodData.isCreator}
      />
      {foodData?.mainNutrients?.[0] && (
        <FoodDensityItem mainNutrients={foodData?.mainNutrients?.[0]} />
      )}
      {foodData?.minerals?.[0] &&
        foodData?.traceElements?.[0] &&
        foodData?.vitamins?.[0] && (
          <SubNutrientsItem
            // @ts-expect-error
            minerals={foodData?.minerals?.[0]}
            // @ts-expect-error
            traceElements={foodData?.traceElements?.[0]}
            // @ts-expect-error
            vitamins={foodData?.vitamins?.[0]}
            requiredNutrients={requiredNutrients}
          />
        )}
      {foodData?.mainNutrients?.[0].calories && (
        <DataItem
          label="Energy"
          value={foodData?.mainNutrients?.[0].calories}
          unit="kcal"
          className="order-3 col-span-3 sm:col-span-1 lg:order-4 lg:col-span-1"
        />
      )}
      {foodData?.mainNutrients?.[0].water && (
        <DataItem
          label="Water"
          value={foodData?.mainNutrients?.[0].water}
          unit="ml"
          className="order-4 col-span-3 sm:col-span-2 lg:order-5 lg:col-span-1"
        />
      )}
      {foodData.mainNutrients?.[0] && (
        <MainNutrientsItem
          mainNutrients={foodData.mainNutrients?.[0]}
          requiredNutrients={requiredNutrients}
        />
      )}
    </div>
  );
};

export default FoodDetailsGrid;
