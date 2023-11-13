'use client';

import { Check, Plus } from 'lucide-react';

import { IconBadge } from '@/components/IconBadge';
import { useCallback, useMemo } from 'react';
import { useCalculator } from '@/context/calculatorContext';
import { WholeFoodWithCategory } from '@/types/types';

interface ToggleFoodButtonProps {
  foodData: WholeFoodWithCategory;
}

const ToggleFoodButton = ({ foodData }: ToggleFoodButtonProps) => {
  const { foodEntries, addFoodEntry, deleteFoodEntry } = useCalculator();

  const isAdded = useMemo(() => {
    return foodEntries.some((item) => item.id === foodData.id);
  }, [foodEntries, foodData.id]);

  const handletoggleFood = useCallback(() => {
    if (isAdded) {
      deleteFoodEntry(foodData.id);
    } else {
      addFoodEntry(foodData);
    }
  }, [isAdded, addFoodEntry, deleteFoodEntry, foodData]);

  return (
    <div onClick={handletoggleFood}>
      <IconBadge
        icon={isAdded ? Check : Plus}
        size='sm'
        className='cursor-pointer hover:bg-primary-200 transition'
      />
    </div>
  );
};

export default ToggleFoodButton;
