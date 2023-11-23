'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Meal, MealFood } from '@prisma/client';

import { useMeal } from '@/context/mealContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import StackedTextWithImage from '@/components/StackedTextWithImage';
import DeleteMealButton from './DeleteMealButton';
import { WholeFoodWithCategory } from '@/types/types';

// type WholeMeal = Meal & { mealFoods: MealFood[] };
type WholeMeal = Meal & {
  mealFoods: Array<MealFood & { food: WholeFoodWithCategory }>;
};
interface MealFoodItemsTableProps {
  initialData: WholeMeal;
}

const MealFoodItemsTable = ({ initialData }: MealFoodItemsTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [initialUpdateDone, setInitialUpdateDone] = useState(false);
  const { addMealEntry, mealEntries, updateMealEntry, originalValues } =
    useMeal();

  // if user navigates to /meal/[mealId] to calculate nutrients according quantity
  useEffect(() => {
    if (
      !initialUpdateDone &&
      Object.keys(originalValues).length !== 0 &&
      initialData.mealFoods.length !== 0
    ) {
      initialData.mealFoods.forEach((item) => {
        updateMealEntry(item.food.id, item.quantity);
      });

      setInitialUpdateDone(true);
    }
  }, [
    initialUpdateDone,
    originalValues,
    updateMealEntry,
    initialData.mealFoods,
  ]);

  // prevent hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // the mealEntries get prefilled with the initialData to  be able to
  // adjust and recalculate quantity if user navigate to /meal/[mealId]
  if (mealEntries.length === 0 && initialData.mealFoods.length !== 0) {
    initialData.mealFoods
      .map((item) => item.food)
      ?.forEach((food) => {
        addMealEntry(food);
      });
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedMealEntries = mealEntries.slice().sort((a, b) => {
    const comparison =
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    foodId: string
  ) => {
    const quantity = Number(event.target.value);
    updateMealEntry(foodId, quantity);
  };

  return (
    <ScrollArea className='min-h-[300px]'>
      {sortedMealEntries.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='flex items-center'>
                <span className='mr-2 truncate'>Title</span>
                <button onClick={toggleSortOrder}>
                  <ArrowUpDown size={15} />
                </button>
              </TableHead>
              <TableHead className='w-0 sm:w-max'>
                <span className='hidden sm:block'>Preference</span>
              </TableHead>
              <TableHead>Quantity (g)</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMealEntries.map((item) => {
              return (
                <TableRow key={item.id}>
                  <StackedTextWithImage
                    isCreator={item.isCreator}
                    imageSrc={item.imageUrl || ''}
                    title={item.title}
                    subtext={item.category.name}
                  />

                  <TableCell>
                    {item.preference ? (
                      <span className='whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full'>
                        {item.preference}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Input
                      type='number'
                      defaultValue={item.quantity}
                      onChange={(e) => handleChangeQuantity(e, item.id)}
                      className='max-w-[80px]'
                      placeholder='100'
                    />
                  </TableCell>
                  <TableCell>
                    <DeleteMealButton mealId={item.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {sortedMealEntries.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-6'>
          No Food selected
        </div>
      )}
    </ScrollArea>
  );
};

export default MealFoodItemsTable;
