'use client';

import { WholeFoodWithCategory } from '@/types/types';
import { createContext, useContext, useState } from 'react';
import {
  mainNutrientItems,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from '../constants/nutrients';

export type SubNutrient = {
  [key: string]: number;
};

type WholeFoodWithCategoryWithEnable = WholeFoodWithCategory & {
  isEnabled: boolean;
};

const initialValue: {
  foodEntries: WholeFoodWithCategoryWithEnable[];
  totalNutrients: {};
  missingNutrients: string[];
  addFoodEntry: (foodItem: WholeFoodWithCategory) => void;
  deleteFoodEntry: (foodId: string) => void;
  updateFoodEntry: (foodId: string, quntity: number) => void;
  toggleEnable: (foodId: string) => void;
  clearAll: () => void;
} = {
  foodEntries: [],
  totalNutrients: {},
  missingNutrients: [],
  addFoodEntry: () => {},
  deleteFoodEntry: () => {},
  updateFoodEntry: () => {},
  toggleEnable: () => {},
  clearAll: () => {},
};

const CalculatorContext = createContext(initialValue);

const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodEntries, setFoodEntries] = useState<
    WholeFoodWithCategoryWithEnable[]
  >([]);
  const [originalValues, setOriginalValues] = useState<
    Record<string, WholeFoodWithCategory>
  >({});

  const missingNutrients: string[] = [];

  const addFoodEntry = (foodItem: WholeFoodWithCategory) => {
    const foodItemWithEnabled = { ...foodItem, isEnabled: true };

    setFoodEntries((prevFoodItem) => [...prevFoodItem, foodItemWithEnabled]);
    setOriginalValues((prevValues) => ({
      ...prevValues,
      [foodItem.id]: { ...foodItem },
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

  const updateNutrientArray = (
    nutrientArray: SubNutrient[],
    quantity: number,
    originalValues: SubNutrient,
    nutrientList: string[]
  ): SubNutrient[] => {
    return nutrientArray.map((nutrient) => {
      const updatedNutrient: SubNutrient = { ...nutrient };
      nutrientList.forEach((item) => {
        if (updatedNutrient[item] !== undefined) {
          const baseValue = originalValues[item] || 0;
          updatedNutrient[item] = (baseValue / 100) * quantity;
        }
      });
      return updatedNutrient;
    });
  };

  const updateFoodEntry = (foodId: string, quantity: number) => {
    setFoodEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) => {
        if (entry.id === foodId) {
          entry.mainNutrients = updateNutrientArray(
            entry.mainNutrients,
            quantity,
            originalValues[foodId]?.mainNutrients?.[0],
            mainNutrientItems
          );

          entry.minerals = updateNutrientArray(
            entry.minerals,
            quantity,
            originalValues[foodId]?.minerals?.[0] || {},
            mineralItems
          );

          entry.vitamins = updateNutrientArray(
            entry.vitamins,
            quantity,
            originalValues[foodId]?.vitamins?.[0] || {},
            vitaminItems
          );

          entry.traceElements = updateNutrientArray(
            entry.traceElements,
            quantity,
            originalValues[foodId]?.traceElements?.[0] || {},
            traceElementItems
          );
        }
        return entry;
      })
    );
  };

  const sumMatchingNutrients = (): SubNutrient => {
    const totalNutrients: SubNutrient = {};

    foodEntries.forEach((entry) => {
      if (entry.isEnabled) {
        mainNutrientItems.forEach((nutrient) => {
          if (entry.mainNutrients && entry.mainNutrients[0]?.[nutrient]) {
            totalNutrients[nutrient] =
              (totalNutrients[nutrient] || 0) +
              entry.mainNutrients[0][nutrient];
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
              (totalNutrients[nutrient] || 0) +
              entry.traceElements[0][nutrient];
          } else {
            missingNutrients.push(nutrient);
          }
        });
      }
    });

    return totalNutrients;
  };

  const toggleEnable = (foodId: string) => {
    setFoodEntries((prevFoodEntries) =>
      prevFoodEntries.map((entry) =>
        entry.id === foodId ? { ...entry, isEnabled: !entry.isEnabled } : entry
      )
    );
  };

  const clearAll = () => {
    setFoodEntries([]);
  };

  const contextValues = {
    foodEntries,
    missingNutrients,
    addFoodEntry,
    deleteFoodEntry,
    updateFoodEntry,
    toggleEnable,
    totalNutrients: sumMatchingNutrients(),
    clearAll,
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
