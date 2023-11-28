'use client';

import { useCallback, useMemo } from 'react';
import { Check, Plus } from 'lucide-react';
import { MainNutrient, Mineral, TraceElement, Vitamin } from '@prisma/client';

import {
  MealWithMealFoodWithFood,
  PreparedMeal,
  WholeFoodWithCategory,
} from '@/types/types';
import {
  mainNutrientItems,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from '@/constants/nutrients';
import IconBadge from '@/components/IconBadge';
import { useCalculator } from '@/context/CalculatorContext';

type NutrientsArray = MainNutrient | Mineral | TraceElement | Vitamin;

interface ToggleMealButtonProps {
  mealItem: MealWithMealFoodWithFood;
  mealId: string;
}

const updateNutrientArray = (
  nutrientArray: NutrientsArray[],
  quantity: number,
  nutrientList: string[]
): NutrientsArray[] => {
  return nutrientArray.map((nutrient) => {
    const updatedNutrient = { ...nutrient } as NutrientsArray & {
      [key: string]: number;
    };

    nutrientList.forEach((item) => {
      if (updatedNutrient[item] !== undefined) {
        updatedNutrient[item] = (updatedNutrient[item] / 100) * quantity;
      }
    });
    return updatedNutrient;
  });
};

const ToggleMealButton = ({ mealItem, mealId }: ToggleMealButtonProps) => {
  const { mealEntries, addMealEntry, deleteMealEntry } = useCalculator();

  const isMealAdded = useMemo(() => {
    return mealEntries.some((item) => item.id === mealId);
  }, [mealEntries, mealId]);

  const handletoggleMeal = useCallback(() => {
    const preparedMeal: PreparedMeal = {
      id: mealId,
      title: mealItem.title,
      imageUrl: mealItem.imageUrl || '',
      items: mealItem.mealFoods.map((food) => {
        // calc the nutrients quantity based on the saved quantity coming from db
        const mainNutrients = updateNutrientArray(
          food.food.mainNutrients || [],
          food.quantity,
          mainNutrientItems
        );

        const minerals = updateNutrientArray(
          food.food.minerals || [],
          food.quantity,
          mineralItems
        );

        const traceElements = updateNutrientArray(
          food.food.traceElements || [],
          food.quantity,
          traceElementItems
        );

        const vitamins = updateNutrientArray(
          food.food.vitamins || [],
          food.quantity,
          vitaminItems
        );

        return {
          ...food.food,
          mainNutrients,
          minerals,
          traceElements,
          vitamins,
        } as WholeFoodWithCategory;
      }),
    };

    if (isMealAdded) {
      deleteMealEntry(mealId);
    } else {
      addMealEntry(preparedMeal);
    }
  }, [
    isMealAdded,
    addMealEntry,
    deleteMealEntry,
    mealId,
    mealItem.title,
    mealItem.imageUrl,
    mealItem.mealFoods,
  ]);

  return (
    <div onClick={handletoggleMeal} className='max-w-fit'>
      <IconBadge
        icon={isMealAdded ? Check : Plus}
        size='sm'
        className='cursor-pointer hover:bg-primary-200 transition'
      />
    </div>
  );
};

export default ToggleMealButton;
