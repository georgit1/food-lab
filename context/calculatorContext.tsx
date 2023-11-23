'use client';

import { createContext, useContext, useState } from 'react';

import {
  FoodEntry,
  MealEntry,
  PreparedMeal,
  WholeFoodWithCategory,
} from '@/types/types';
import {
  mainNutrientItems,
  mineralItems,
  nutrients,
  traceElementItems,
  vitaminItems,
} from '../constants/nutrients';

export type SubNutrient = {
  [key: string]: number;
};

export type WholeFoodWithCategoryWithEnable = WholeFoodWithCategory & {
  isEnabled: boolean;
};

const initialValue: {
  foodEntries: FoodEntry[];
  mealEntries: MealEntry[];
  originalValues: Record<string, { [key: string]: string | number }>;
  totalNutrients: Record<string, number>;
  missingNutrients: { [key: string]: number[] }[];
  addFoodEntry: (foodItem: WholeFoodWithCategory) => void;
  deleteFoodEntry: (foodId: string) => void;
  updateFoodEntry: (foodId: string, quntity: number) => void;
  addMealEntry: (mealItem: PreparedMeal) => void;
  deleteMealEntry: (mealId: string) => void;
  updateMealEntry: (mealId: string, servings: number) => void;
  toggleEnableFood: (foodId: string) => void;
  toggleEnableMeal: (mealId: string) => void;
  clearAll: () => void;
} = {
  foodEntries: [],
  mealEntries: [],
  originalValues: {},
  totalNutrients: {},
  missingNutrients: [],
  addFoodEntry: () => {},
  deleteFoodEntry: () => {},
  updateFoodEntry: () => {},
  addMealEntry: () => {},
  deleteMealEntry: () => {},
  updateMealEntry: () => {},
  toggleEnableFood: () => {},
  toggleEnableMeal: () => {},
  clearAll: () => {},
};

const CalculatorContext = createContext(initialValue);

const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [mealEntries, setMealEntries] = useState<MealEntry[]>([]);
  const [originalValues, setOriginalValues] = useState<
    Record<string, { [key: string]: string | number }>
  >({});

  const missingNutrients: { [key: string]: number[] }[] = [];

  const addFoodEntry = (foodItem: WholeFoodWithCategory) => {
    // make one single object with all nutrients
    const preparedNutrients = sumMatchingNutrients([foodItem]);

    const preparedFood: FoodEntry = {
      ...foodItem,
      category: foodItem.category.name,
      quantity: 100,
      isEnabled: true,
      isCreator: foodItem.isCreator,
      nutrients: preparedNutrients,
    };

    setFoodEntries((prevFoodItem) => [...prevFoodItem, preparedFood]);
    setOriginalValues((prevValues) => ({
      ...prevValues,
      [foodItem.id]: { ...preparedNutrients },
    }));
  };

  const addMealEntry = (mealItem: PreparedMeal) => {
    const preparedNutrients = sumMatchingNutrients(mealItem.items);

    const meal: MealEntry = {
      id: mealItem.id,
      title: mealItem.title,
      imageUrl: mealItem.imageUrl,
      ingredients: mealItem.items.map((item) => item.title),
      servings: 1,
      isEnabled: true,
      nutrients: preparedNutrients,
    };

    setMealEntries((prevMealItem) => [...prevMealItem, meal]);
    setOriginalValues((prevValues) => ({
      ...prevValues,
      [mealItem.id]: { ...preparedNutrients },
    }));
  };

  const deleteFoodEntry = (foodId: string) => {
    setFoodEntries((prevFoodItem) => {
      return prevFoodItem.filter((item) => item.id !== foodId);
    });
    setOriginalValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[foodId];
      return updatedValues;
    });
  };

  const deleteMealEntry = (mealId: string) => {
    setMealEntries((prevMealItem) => {
      return prevMealItem.filter((item) => item.id !== mealId);
    });

    setOriginalValues((prevValues) => {
      const updatedValues = { ...prevValues };
      delete updatedValues[mealId];
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
  //       if (updatedNutrient[item] !== undefined) {
  //         const baseValue = originalValues[item] || 0;
  //         updatedNutrient[item] = (baseValue / 100) * quantity;
  //       }
  //     });
  //     return updatedNutrient;
  //   });
  // };

  const updateFoodEntry = (foodId: string, quantity: number) => {
    setFoodEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) => {
        if (entry.id === foodId) {
          entry.quantity = quantity;

          nutrients.forEach((item) => {
            if (entry.nutrients[item] !== undefined) {
              const baseValue = originalValues[entry.id][item] as number;
              entry.nutrients[item] = (baseValue / 100) * quantity;
            }
          });

          // entry.mainNutrients = updateNutrientArray(
          //   entry.mainNutrients,
          //   quantity,
          //   originalValues[foodId]?.mainNutrients?.[0],
          //   mainNutrientItems
          // );

          // entry.minerals = updateNutrientArray(
          //   entry.minerals,
          //   quantity,
          //   originalValues[foodId]?.minerals?.[0] || {},
          //   mineralItems
          // );

          // entry.vitamins = updateNutrientArray(
          //   entry.vitamins,
          //   quantity,
          //   originalValues[foodId]?.vitamins?.[0] || {},
          //   vitaminItems
          // );

          // entry.traceElements = updateNutrientArray(
          //   entry.traceElements,
          //   quantity,
          //   originalValues[foodId]?.traceElements?.[0] || {},
          //   traceElementItems
          // );
        }
        return entry;
      })
    );
  };

  const updateMealEntry = (mealId: string, servings: number) => {
    setMealEntries((prevMealEntries) =>
      prevMealEntries.map((entry) => {
        if (entry.id === mealId) {
          entry.servings = servings;

          nutrients.forEach((item) => {
            if (entry.nutrients[item] !== undefined) {
              const baseValue = originalValues[entry.id][item] as number;
              entry.nutrients[item] = (baseValue / 1) * servings;
            }
          });
        }
        return entry;
      })
    );
  };

  const sumMatchingNutrients = (
    entries: WholeFoodWithCategory[]
  ): SubNutrient => {
    const totalNutrients: SubNutrient = {};

    entries.forEach((entry: { [key: string]: any }) => {
      // neccessary for title in missingnutrients
      totalNutrients.title = entry.title;

      mainNutrientItems.forEach((nutrient) => {
        if (entry.mainNutrients && entry.mainNutrients[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.mainNutrients[0][nutrient];
        }
      });

      mineralItems.forEach((nutrient) => {
        if (entry.minerals && entry.minerals[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.minerals[0][nutrient];
        }
      });

      vitaminItems.forEach((nutrient) => {
        if (entry.vitamins && entry.vitamins[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.vitamins[0][nutrient];
        }
      });

      traceElementItems.forEach((nutrient) => {
        if (entry.traceElements && entry.traceElements[0]?.[nutrient]) {
          totalNutrients[nutrient] =
            (totalNutrients[nutrient] || 0) + entry.traceElements[0][nutrient];
        }
      });
    });

    return totalNutrients;
  };

  // sum all individual nutrients from given nutrients objects
  const aggregateNutrients = (data: Record<string, number>[]) => {
    const result: Record<string, number> = {};

    for (const nutrient of nutrients) {
      for (const nutrientData of data) {
        const value = nutrientData[nutrient];
        if (value !== undefined) {
          result[nutrient] = (result[nutrient] || 0) + value;
        } else {
          // create an array of objects with nutrient as key and array with missing titles
          // if it already exist append title otherwise create new
          const existingNutrientIndex = missingNutrients.findIndex(
            (item) => item[nutrient]
          );
          if (
            existingNutrientIndex !== -1 &&
            !missingNutrients[existingNutrientIndex][nutrient].includes(
              nutrientData.title
            )
          ) {
            missingNutrients[existingNutrientIndex][nutrient].push(
              nutrientData.title
            );
          } else {
            missingNutrients.push({ [nutrient]: [nutrientData.title] });
          }
        }
      }
    }

    return result;
  };

  const toggleEnableFood = (foodId: string) => {
    setFoodEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) =>
        entry.id === foodId ? { ...entry, isEnabled: !entry.isEnabled } : entry
      )
    );
  };

  const toggleEnableMeal = (mealId: string) => {
    setMealEntries((prevMealEntries) =>
      prevMealEntries.map((entry) =>
        entry.id === mealId ? { ...entry, isEnabled: !entry.isEnabled } : entry
      )
    );
  };

  const clearAll = () => {
    setFoodEntries([]);
    setMealEntries([]);
  };

  const contextValues = {
    foodEntries,
    mealEntries,
    originalValues,
    missingNutrients,
    addFoodEntry,
    deleteFoodEntry,
    updateFoodEntry,
    addMealEntry,
    deleteMealEntry,
    updateMealEntry,
    toggleEnableFood,
    toggleEnableMeal,
    clearAll,
    totalNutrients: aggregateNutrients([
      ...foodEntries
        .filter((entry) => entry.isEnabled === true)
        .map((entry) => entry.nutrients),
      ...mealEntries
        .filter((entry) => entry.isEnabled === true)
        .map((entry) => entry.nutrients),
    ]),
  };

  return (
    <CalculatorContext.Provider value={contextValues}>
      {children}
    </CalculatorContext.Provider>
  );
};

const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined)
    throw new Error('CalculatorContext was used outside of CalculatorProvider');
  return context;
};

export { CalculatorProvider, useCalculator };
