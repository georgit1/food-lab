import { MainNutrient } from "@prisma/client";

import DensityChart from "./DensityChart";

interface FoodDensityItemProps {
  mainNutrients: MainNutrient;
}

const FoodDensityItem = ({ mainNutrients }: FoodDensityItemProps) => {
  return (
    <div className="relative order-2 col-span-2 overflow-hidden rounded-md bg-primary-50 p-2 pb-0 sm:col-span-2 lg:col-span-1">
      <div className="absolute bottom-2 right-2 z-10 text-xs font-semibold text-primary-600">
        % per 100 kcal
      </div>
      <h3 className="text-lg font-semibold text-primary-600">Food Density</h3>
      <DensityChart mainNutrients={mainNutrients} />
    </div>
  );
};

export default FoodDensityItem;
