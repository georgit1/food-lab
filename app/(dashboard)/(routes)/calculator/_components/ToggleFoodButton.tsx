"use client";

import { Check, Plus } from "lucide-react";
import { useCallback, useMemo } from "react";

import { useMeal } from "@/context/MealContext";
import { useCalculator } from "@/context/CalculatorContext";
import { WholeFoodWithCategory } from "@/types/types";

import IconBadge from "@/components/IconBadge";

interface ToggleFoodButtonProps {
  foodData: WholeFoodWithCategory;
  useCase?: string;
}

const ToggleFoodButton = ({ foodData, useCase }: ToggleFoodButtonProps) => {
  const { foodEntries, addFoodEntry, deleteFoodEntry } = useCalculator();
  const { mealEntries, addMealEntry, deleteMealEntry } = useMeal();

  // logic if default usecase to only select food items
  const isFoodAdded = useMemo(() => {
    return foodEntries.some((item) => item.id === foodData.id);
  }, [foodEntries, foodData.id]);

  const handletoggleFood = useCallback(() => {
    if (isFoodAdded) {
      deleteFoodEntry(foodData.id);
    } else {
      addFoodEntry(foodData);
    }
  }, [isFoodAdded, addFoodEntry, deleteFoodEntry, foodData]);

  // logic if 'meal' usecase to select meal food items
  const isMealFoodAdded = useMemo(() => {
    return mealEntries.some((item) => item.id === foodData.id);
  }, [mealEntries, foodData.id]);

  const handletoggleMealFood = useCallback(() => {
    if (isMealFoodAdded) {
      deleteMealEntry(foodData.id);
    } else {
      addMealEntry(foodData);
    }
  }, [isMealFoodAdded, addMealEntry, deleteMealEntry, foodData]);

  return (
    <div
      onClick={useCase === "meal" ? handletoggleMealFood : handletoggleFood}
      className="float-right max-w-fit"
    >
      <IconBadge
        icon={
          (isFoodAdded && !useCase) || (isMealFoodAdded && useCase === "meal")
            ? Check
            : Plus
        }
        size="sm"
        className="cursor-pointer transition hover:bg-primary-200"
      />
    </div>
  );
};

export default ToggleFoodButton;
