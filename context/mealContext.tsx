'use client';

import { createContext, useContext, useState } from 'react';
import { MainNutrient, Mineral, TraceElement, Vitamin } from '@prisma/client';

import {
  WholeFoodWithCategory,
  WholeFoodWithCategoryWithQuantity,
} from '@/types/types';
import {
  mainNutrientItems,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from '../constants/nutrients';

export type SubNutrient = {
  [key: string]: number;
};

const initialValue: {
  mealEntries: WholeFoodWithCategory[];
  addMealEntry: (foodItem: WholeFoodWithCategory) => void;
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
  const [mealEntries, setMealEntries] = useState<WholeFoodWithCategory[]>([]);
  // const [mealIds, setMealIds] = useState<string[]>([]);
  const [originalValues, setOriginalValues] = useState<
    Record<string, WholeFoodWithCategory>
  >({});

  const missingNutrients: string[] = [];

  const addMealEntry = (foodItem: WholeFoodWithCategory) => {
    // const preparedFoodItem = { ...foodItem, quantity: 100 };

    setMealEntries((prevFoodItem) => [...prevFoodItem, foodItem]);
    setOriginalValues((prevValues) => ({
      ...prevValues,
      [foodItem.id]: { ...foodItem },
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

  // const updateNutrientArray = (
  //   nutrientArray: SubNutrient[],
  //   quantity: number,
  //   originalValues: SubNutrient,
  //   nutrientList: string[]
  // ): SubNutrient[] => {
  //   return nutrientArray.map((nutrient) => {
  //     const updatedNutrient: SubNutrient = { ...nutrient };
  //     nutrientList.forEach((item) => {
  //       console.log(item, originalValues);
  //       if (updatedNutrient[item] !== undefined) {
  //         const baseValue = originalValues[item] || 0;
  //         updatedNutrient[item] = (baseValue / 100) * quantity;
  //       }
  //     });
  //     return updatedNutrient;
  //   });
  // };

  type NutrientsObject = MainNutrient | Mineral | TraceElement | Vitamin;

  type NutrientsObjectWithIndex = NutrientsObject & {
    [key: string]: number | undefined;
  };

  const updateNutrientArray = (
    nutrientArray: NutrientsObject[],
    quantity: number,
    originalValues: NutrientsObjectWithIndex,
    nutrientList: string[]
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

  // const updateMealEntry = (foodId: string, quantity: number) => {
  //   setMealEntries((prevFoodEntries) =>
  //     prevFoodEntries.map((entry) => {
  //       if (entry.id === foodId) {
  //         // add quantity property on change - default value 100
  //         entry.quantity = quantity;
  //         entry.mainNutrients = updateNutrientArray(
  //           entry.mainNutrients,
  //           quantity,
  //           originalValues[foodId]?.mainNutrients?.[0],
  //           mainNutrientItems
  //         );
  //         entry.minerals = updateNutrientArray(
  //           entry.minerals,
  //           quantity,
  //           originalValues[foodId]?.minerals?.[0] || {},
  //           mineralItems
  //         );
  //         entry.vitamins = updateNutrientArray(
  //           entry.vitamins,
  //           quantity,
  //           originalValues[foodId]?.vitamins?.[0] || {},
  //           vitaminItems
  //         );
  //         entry.traceElements = updateNutrientArray(
  //           entry.traceElements,
  //           quantity,
  //           originalValues[foodId]?.traceElements?.[0] || {},
  //           traceElementItems
  //         );
  //       }
  //       return entry;
  //     })
  //   );
  // };

  const updateMealEntry = (foodId: string, quantity: number) => {
    setMealEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) => {
        if (entry.id === foodId) {
          // add quantity property on change - default value 100
          // entry.quantity = quantity;

          const mainNutrients = updateNutrientArray(
            entry.mainNutrients || [],
            quantity,
            originalValues[foodId]
              ?.mainNutrients?.[0] as NutrientsObjectWithIndex,
            mainNutrientItems
          );

          const minerals = updateNutrientArray(
            entry.minerals || [],
            quantity,
            originalValues[foodId]?.minerals?.[0] as NutrientsObjectWithIndex,
            mineralItems
          );

          const traceElements = updateNutrientArray(
            entry.traceElements || [],
            quantity,
            originalValues[foodId]
              ?.traceElements?.[0] as NutrientsObjectWithIndex,
            traceElementItems
          );

          const vitamins = updateNutrientArray(
            entry.vitamins || [],
            quantity,
            originalValues[foodId]?.vitamins?.[0] as NutrientsObjectWithIndex,
            vitaminItems
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
      })
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
    throw new Error('MealContext was used outside of MealProvider');
  return context;
};

export { MealProvider, useMeal };
