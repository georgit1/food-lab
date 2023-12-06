import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import IconBadge from "@/components/IconBadge";

interface NutrientComparisonProps {
  food1: Record<string, number>;
  food2: Record<string, number>;
}

const formatNutrientName = (nutrient: string) => {
  const words = nutrient.split(/(?=[A-Z])/);
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  return formattedWords.join(" ");
};

const defaultNutrients = [
  "calories",
  "fats",
  "proteins",
  "carbohydrates",
  "sugar",
  "fiber",
  "salt",
  "water",
];

const NutrientComparison = ({ food1, food2 }: NutrientComparisonProps) => {
  const [showAllNutrients, setShowAllNutrients] = useState(false);

  const nutrients = Object.keys(food1);
  // Filter out nutrients where either food1 or food2 has missing data
  const validNutrients = nutrients.filter(
    (nutrient) =>
      typeof food1[nutrient] === "number" &&
      typeof food2[nutrient] === "number",
  );

  const nutrientsToShow = showAllNutrients ? validNutrients : defaultNutrients;

  // Filter out default nutrients
  const customNutrients = nutrients.filter(
    (nutrient) => !defaultNutrients.includes(nutrient),
  );

  const hasValues = customNutrients.some(
    (nutrient) => food1[nutrient] && food2[nutrient],
  );

  return (
    <div className="mx-auto flex w-full max-w-[650px] flex-col gap-4 px-10">
      {nutrientsToShow.map((nutrient) => {
        const totalSum = food1[nutrient] + food2[nutrient];

        // Calculate the percentage of each value
        const percent1 =
          isNaN(totalSum) || totalSum === 0
            ? 50
            : (food1[nutrient] / totalSum) * 100;
        const percent2 =
          isNaN(totalSum) || totalSum === 0
            ? 50
            : totalSum === 100
              ? 50
              : 100 - percent1;

        return (
          <div key={nutrient} className="flex flex-col items-center gap-1">
            <div className="flex w-full justify-between">
              <span className="w-28 truncate text-left text-sm font-bold text-primary-800">
                {food1[nutrient]?.toFixed(1) || "0.0"}
              </span>
              <div className="text-sm font-semibold text-primary-800">
                {formatNutrientName(nutrient)}
              </div>
              <span className="w-28 truncate text-right text-sm font-bold text-primary-800">
                {food2[nutrient]?.toFixed(1) || "0.0"}
              </span>
            </div>
            <div className="flex w-full items-center overflow-x-hidden">
              <div
                className="h-1.5 rounded-l-full bg-primary-500"
                style={{
                  width: `${percent1}%`,
                  maxWidth: "100%",
                }}
              ></div>
              <div
                className="h-1.5 rounded-r-full bg-primary-300"
                style={{
                  width: `${percent2}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
        );
      })}
      {hasValues && (
        <div className="col-span-2 mt-4 flex">
          <div className="mx-auto flex flex-col content-center gap-1">
            <span className="mx-auto text-xs font-semibold text-primary-600">
              {showAllNutrients ? "hide full results" : "full results"}
            </span>
            <span
              className="mx-auto"
              onClick={() => setShowAllNutrients(!showAllNutrients)}
            >
              <IconBadge
                icon={showAllNutrients ? ChevronUp : ChevronDown}
                size="sm"
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutrientComparison;
