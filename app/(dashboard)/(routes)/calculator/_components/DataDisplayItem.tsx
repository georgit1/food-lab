import { parseDecimal } from "@/utils/convertUtils";
import { NutrientData } from "@/utils/calcPersonalNutrients.js";
import { SubNutrient } from "@/context/CalculatorContext.jsx";

import LabeledProgess from "./LabeledProgress.tsx";
import RadialProgess from "@/components/RadialProgess";
import { Separator } from "@/components/ui/separator";

interface DataDisplayItemProps {
  totalNutrients: SubNutrient;
  requiredNutrients: NutrientData;
}

const DataDisplayItem = ({
  totalNutrients,
  requiredNutrients,
}: DataDisplayItemProps) => {
  return (
    <div className="xs:mx-0 -mx-5 flex justify-center rounded-md bg-primary-50 py-2">
      <div className="flex flex-grow flex-col items-center gap-4 pb-4">
        <RadialProgess
          label="Calories"
          value={totalNutrients.calories}
          maxValue={parseDecimal(requiredNutrients.calories)}
        />
        <div className="w-full space-y-2">
          <LabeledProgess
            label="Proteins"
            value={totalNutrients.proteins?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.proteins).toFixed(1)}
            unit="g"
          />
          <LabeledProgess
            label="Carbs"
            value={totalNutrients.carbohydrates?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.carbohydrates).toFixed(1)}
            unit="g"
          />
          <LabeledProgess
            label="Fats"
            value={totalNutrients.fats?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.fats).toFixed(1)}
            unit="g"
          />
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-grow flex-col items-center gap-4 px-4">
        <RadialProgess
          label="Water"
          value={totalNutrients.water}
          maxValue={parseDecimal(requiredNutrients.water)}
        />
        <div className="w-full space-y-2">
          <LabeledProgess
            label="Fiber"
            value={totalNutrients.fiber?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.fiber).toFixed(1)}
            unit="g"
          />
          <LabeledProgess
            label="Sugar"
            value={totalNutrients.sugar?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.sugar).toFixed(1)}
            unit="g"
          />
          <LabeledProgess
            label="Salt"
            value={totalNutrients.salt?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.salt).toFixed(1)}
            unit="g"
          />
        </div>
      </div>
    </div>
  );
};

export default DataDisplayItem;

export const removeTrailingZeros = (num: number): string => {
  const trimmedNum = num.toFixed(2).replace(/\.?0*$/, "");
  return trimmedNum;
};
