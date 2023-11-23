'use client';

import { ChangeEvent, useState } from 'react';

import { MealEntry } from '@/types/types';
import { useModal } from '@/hooks/useModalStore';
import { useCalculator } from '@/context/calculatorContext';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import StackedTextWithImage from '@/components/StackedTextWithImage';

interface FoodItemsTableProps {
  mealEntries: MealEntry[];
}

const MealItemsTable = ({ mealEntries }: FoodItemsTableProps) => {
  const [disabledRows, setDisabledRows] = useState<string[]>([]);
  const { updateMealEntry, toggleEnableMeal } = useCalculator();

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    mealId: string
  ) => {
    const quantity = Number(event.target.value);
    updateMealEntry(mealId, quantity);
  };

  const handleCheckboxChange = (foodId: string) => {
    toggleEnableMeal(foodId);
    setDisabledRows((prevRows) =>
      prevRows.includes(foodId)
        ? prevRows.filter((rowId) => rowId !== foodId)
        : [...prevRows, foodId]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Meals</TableHead>
          <TableHead>Servings</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      {mealEntries.map((item) => (
        <TableBody key={item.id}>
          <TableRow>
            <StackedTextWithImage
              imageSrc={item.imageUrl || ''}
              title={item.title}
              subtext={item.ingredients.join(', ')}
              variant={disabledRows.includes(item.id) ? 'disabled' : 'default'}
              isMeal={true}
            />
            <TableCell>
              <Input
                type='number'
                onChange={(e) => handleChangeQuantity(e, item.id)}
                disabled={disabledRows.includes(item.id)}
                className='max-w-[80px]'
                defaultValue={item.servings}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                defaultChecked
                onCheckedChange={() => handleCheckboxChange(item.id)}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </Table>
  );
};

export default MealItemsTable;
