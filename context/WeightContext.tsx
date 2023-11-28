'use client';

import { Nutrient } from '@/types/types';
import { createContext, useContext, useState } from 'react';

const initialWeights = {
  calories: 100,
  fats: 100,
  saturated: 100,
  unsaturated: 100,
  polyunsaturated: 100,
  proteins: 100,
  carbohydrates: 100,
  sugar: 100,
  fiber: 100,
  salt: 100,
  water: 100,
  calcium: 100,
  chloride: 100,
  potassium: 100,
  magnesium: 100,
  sodium: 100,
  phosphorus: 100,
  sulfur: 100,
  copper: 100,
  fluoride: 100,
  iron: 100,
  iodine: 100,
  manganese: 100,
  zinc: 100,
  selenium: 100,
  vitaminA: 100,
  vitaminB1: 100,
  vitaminB2: 100,
  vitaminB3: 100,
  vitaminB5: 100,
  vitaminB6: 100,
  vitaminB7: 100,
  vitaminB9: 100,
  vitaminB12: 100,
  vitaminC: 100,
  vitaminD: 100,
  vitaminE: 100,
  vitaminK: 100,
};

const initialValues: {
  nutrientWeights: Record<Nutrient, number>;
  updateNutrientWeight: (nutrient: Nutrient, weight: number) => void;
  resetNutrientWeights: () => void;
} = {
  nutrientWeights: initialWeights,
  updateNutrientWeight: () => {},
  resetNutrientWeights: () => {},
};

const WeightContext = createContext(initialValues);

const WeightProvider = ({ children }: { children: React.ReactNode }) => {
  const [nutrientWeights, setNutrientWeights] =
    useState<Record<Nutrient, number>>(initialWeights);

  const updateNutrientWeight = (nutrient: Nutrient, weight: number) => {
    setNutrientWeights((prevWeights) => ({
      ...prevWeights,
      [nutrient]: weight,
    }));
  };

  const resetNutrientWeights = () => {
    setNutrientWeights(initialWeights);
  };

  const contextValues = {
    nutrientWeights,
    updateNutrientWeight,
    resetNutrientWeights,
  };

  return (
    <WeightContext.Provider value={contextValues}>
      {children}
    </WeightContext.Provider>
  );
};

const useWeight = () => {
  const context = useContext(WeightContext);

  if (context === undefined)
    throw new Error('WeigthContext was used outside of WeightProvider');
  return context;
};

export { WeightProvider, useWeight };
