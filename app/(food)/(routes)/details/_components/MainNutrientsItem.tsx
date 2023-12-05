import { MainNutrient } from "@prisma/client";

import NutrientsBarChart from "./NutrientsBarChart";
import { NutrientData } from "@/utils/calcPersonalNutrients";

interface MainNutrientsItemProps {
  mainNutrients: MainNutrient;
  requiredNutrients: NutrientData;
}

const mainNutrientItems = [
  "fats",
  "saturated",
  "monounsaturated",
  "polyunsaturated",
  "proteins",
  "carbohydrates",
  "sugar",
  "fiber",
  "salt",
];

const MainNutrientsItem = ({
  mainNutrients,
  requiredNutrients,
}: MainNutrientsItemProps) => {
  return (
    <div className="order-5 col-span-3 lg:order-6 lg:col-span-2">
      <NutrientsBarChart
        nutrients={mainNutrients}
        nutrientsItems={mainNutrientItems}
        targetUnit="g"
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default MainNutrientsItem;
