'use client';

import { Trash } from 'lucide-react';

import { useMeal } from '@/context/MealContext';
import IconBadge from '@/components/IconBadge';

interface DeleteMealButtonProps {
  mealId: string;
}

const DeleteMealButton = ({ mealId }: DeleteMealButtonProps) => {
  const { deleteMealEntry } = useMeal();

  return (
    <div onClick={() => deleteMealEntry(mealId)}>
      <IconBadge
        icon={Trash}
        size='sm'
        className='w-fit cursor-pointer hover:bg-primary-200 transition'
      />
    </div>
  );
};

export default DeleteMealButton;
