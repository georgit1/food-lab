"use client";

import { Mineral, TraceElement, Vitamin } from "@prisma/client";

import {
  mineralItems,
  traceElementItems,
  vitaminItems,
} from "@/constants/nutrients";
import { useCalculator } from "@/context/CalculatorContext";
import { NutrientData } from "@/utils/calcPersonalNutrients";
import { FoodEntry, MealEntry, WholeFoodWithCategory } from "@/types/types";

import DataDisplayItem from "./DataDisplayItem";
import FoodTableItem from "./FoodTableItem";
import SubnutrientsItem from "./SubnutrientsItem";

interface CalculatorGridProps {
  foodData: WholeFoodWithCategory[];
  requiredNutrients: NutrientData;
}

const CalculatorGrid = ({
  foodData,
  requiredNutrients,
}: CalculatorGridProps) => {
  const {
    totalNutrients,
    foodEntries,
    mealEntries,
  }: {
    totalNutrients: { [key: string]: number };
    foodEntries: FoodEntry[];
    mealEntries: MealEntry[];
  } = useCalculator();

  // extract nutrient values based on what mentioned in the items arrays
  // and also extract associated units from the foodData of the database
  const minerals = mineralItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + "Unit"]:
        foodData[0].minerals?.[0][(item + "Unit") as keyof Mineral],
    };
  }, {});

  const traceElements = traceElementItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + "Unit"]:
        foodData[0].traceElements?.[0][(item + "Unit") as keyof TraceElement],
    };
  }, {});

  const vitamins = vitaminItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + "Unit"]:
        foodData[0].vitamins?.[0][(item + "Unit") as keyof Vitamin],
    };
  }, {});

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <FoodTableItem foodEntries={foodEntries} mealEntries={mealEntries} />
      <DataDisplayItem
        totalNutrients={totalNutrients}
        requiredNutrients={requiredNutrients}
      />

      <SubnutrientsItem
        minerals={minerals}
        traceElements={traceElements}
        vitamins={vitamins}
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default CalculatorGrid;
