"use client";

import { createContext, useContext, useState } from "react";
import { MainNutrient, Mineral, TraceElement, Vitamin } from "@prisma/client";

import {
  WholeFoodWithCategory,
  WholeFoodWithCategoryWithQuantity,
} from "@/types/types";
import {
  mainNutrientItems,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from "../constants/nutrients";

export type SubNutrient = {
  [key: string]: number;
};

type NutrientsObject = MainNutrient | Mineral | TraceElement | Vitamin;

type NutrientsObjectWithIndex = NutrientsObject & {
  [key: string]: number | undefined;
};

const initialValue: {
  mealEntries: WholeFoodWithCategoryWithQuantity[];
  addMealEntry: (
    foodItem: WholeFoodWithCategoryWithQuantity,
    quantity?: number,
  ) => void;
  deleteMealEntry: (foodId: string) => void;
  updateMealEntry: (foodId: string, quntity: number) => void;
  originalValues: Record<string, WholeFoodWithCategory>;
  totalNutrients: SubNutrient;
  clearAll: () => void;
} = {
  mealEntries: [],
  addMealEntry: () => {},
  deleteMealEntry: () => {},
  updateMealEntry: () => {},
  originalValues: {},
  totalNutrients: {},
  clearAll: () => {},
};

const MealContext = createContext(initialValue);

const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [mealEntries, setMealEntries] = useState<
    WholeFoodWithCategoryWithQuantity[]
  >([]);
  const [originalValues, setOriginalValues] = useState<
    Record<string, WholeFoodWithCategory>
  >({});

  const missingNutrients: string[] = [];

  const addMealEntry = (
    foodItem: WholeFoodWithCategoryWithQuantity,
    quantity: number = 100,
  ) => {
    const preparedFoodItem = { ...foodItem, quantity };

    setMealEntries((prevFoodItem) => [...prevFoodItem, preparedFoodItem]);
    setOriginalValues((prevValues) => ({
      ...prevValues,
      [foodItem.id]: { ...preparedFoodItem },
    }));
  };

  const deleteMealEntry = (foodId: string) => {
    setMealEntries((prevFoodItem) => {
      return prevFoodItem.filter((item) => item.id !== foodId);
    });
    setOriginalValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[foodId];
      return updatedValues;
    });
  };

  const updateNutrientArray = (
    nutrientArray: NutrientsObject[],
    quantity: number,
    originalValues: NutrientsObjectWithIndex,
    nutrientList: string[],
  ): NutrientsObject[] => {
    return nutrientArray.map((nutrient) => {
      const updatedNutrient = { ...nutrient } as NutrientsObjectWithIndex;

      nutrientList.forEach((item) => {
        if (updatedNutrient[item] !== undefined) {
          const baseValue = originalValues?.[item] || 0;
          updatedNutrient[item] = (baseValue / 100) * quantity;
        }
      });
      return updatedNutrient;
    });
  };

  const updateMealEntry = (foodId: string, quantity: number) => {
    setMealEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) => {
        if (entry.id === foodId) {
          const mainNutrients = updateNutrientArray(
            entry.mainNutrients || [],
            quantity,
            originalValues[foodId]
              ?.mainNutrients?.[0] as NutrientsObjectWithIndex,
            mainNutrientItems,
          );

          const minerals = updateNutrientArray(
            entry.minerals || [],
            quantity,
            originalValues[foodId]?.minerals?.[0] as NutrientsObjectWithIndex,
            mineralItems,
          );

          const traceElements = updateNutrientArray(
            entry.traceElements || [],
            quantity,
            originalValues[foodId]
              ?.traceElements?.[0] as NutrientsObjectWithIndex,
            traceElementItems,
          );

          const vitamins = updateNutrientArray(
            entry.vitamins || [],
            quantity,
            originalValues[foodId]?.vitamins?.[0] as NutrientsObjectWithIndex,
            vitaminItems,
          );

          return {
            ...entry,
            quantity,
            mainNutrients,
            minerals,
            traceElements,
            vitamins,
          } as WholeFoodWithCategoryWithQuantity;
        }

        return entry;
      }),
    );
  };

  const sumMatchingNutrients = (): SubNutrient => {
    const totalNutrients: SubNutrient = {};

    mealEntries.forEach((entry: { [key: string]: any }) => {
      mainNutrientItems.forEach((nutrient) => {
        if (
          entry.mainNutrients &&
          entry.mainNutrients[0]?.[nutrient] !== undefined
        ) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.mainNutrients[0][nutrient];
        } else {
          missingNutrients.push(nutrient);
        }
      });

      mineralItems.forEach((nutrient) => {
        if (entry.minerals && entry.minerals[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.minerals[0][nutrient];
        } else {
          missingNutrients.push(nutrient);
        }
      });

      vitaminItems.forEach((nutrient) => {
        if (entry.vitamins && entry.vitamins[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.vitamins[0][nutrient];
        } else {
          missingNutrients.push(nutrient);
        }
      });

      traceElementItems.forEach((nutrient) => {
        if (entry.traceElements && entry.traceElements[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.traceElements[0][nutrient];
        } else {
          missingNutrients.push(nutrient);
        }
      });
    });

    return totalNutrients;
  };

  const clearAll = () => {
    setMealEntries([]);
  };

  const contextValues = {
    mealEntries,
    addMealEntry,
    deleteMealEntry,
    updateMealEntry,
    originalValues,
    totalNutrients: sumMatchingNutrients(),
    clearAll,
  };

  return (
    <MealContext.Provider value={contextValues}>
      {children}
    </MealContext.Provider>
  );
};

const useMeal = () => {
  const context = useContext(MealContext);
  if (context === undefined)
    throw new Error("MealContext was used outside of MealProvider");
  return context;
};

export { MealProvider, useMeal };
