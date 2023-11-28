'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { BookmarkPlus, MoreHorizontal, Trash } from 'lucide-react';

import { FoodEntry } from '@/types/types';
import { useCalculator } from '@/context/CalculatorContext';
import { ModalType, useModal } from '@/hooks/useModalStore';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import StackedTextWithImage from '@/components/StackedTextWithImage';
import { useMeal } from '@/context/MealContext';

interface FoodItemsTableProps {
  foodEntries: FoodEntry[];
}

const FoodItemsTable = ({ foodEntries }: FoodItemsTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [disabledRows, setDisabledRows] = useState<string[]>([]);
  const { onOpen } = useModal();
  const { updateFoodEntry, toggleEnableFood, clearAll } = useCalculator();
  const { updateMealEntry } = useMeal();

  // prevent hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    foodId: string
  ) => {
    const quantity = Number(event.target.value);
    updateFoodEntry(foodId, quantity);

    // update in meal if user wants to save as meal
    // (data is present beacause was also added on ToogleFoodButton)
    updateMealEntry(foodId, quantity);
  };

  const handleCheckboxChange = (foodId: string) => {
    toggleEnableFood(foodId);
    setDisabledRows((prevRows) =>
      prevRows.includes(foodId)
        ? prevRows.filter((rowId) => rowId !== foodId)
        : [...prevRows, foodId]
    );
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foods</TableHead>
            <TableHead>Quantity(g)</TableHead>
            <TableHead className='text-xl font-bold mb-2 cursor-pointer'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='absolute top-3 right-4 p-1 rounded-full bg-primary-50 hover:bg-primary-100 transition'>
                    <MoreHorizontal
                      size={20}
                      className='text-primary-600 cursor-pointer hover'
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='left'>
                  <DropdownMenuItem
                    onClick={(e) => onAction(e, 'createMeal')}
                    className='cursor-pointer text-primary-800'
                  >
                    <BookmarkPlus className='mr-2 h-4 w-4' />
                    <span>Add Meal</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAll}
                    className='cursor-pointer text-red-600'
                  >
                    <Trash className='mr-2 h-4 w-4' />
                    <span>Clear List</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
          </TableRow>
        </TableHeader>
        {foodEntries.length != 0 && (
          <TableBody>
            {foodEntries.map((item) => (
              <TableRow key={item.id}>
                <StackedTextWithImage
                  isCreator={item.isCreator}
                  imageSrc={item.imageUrl || ''}
                  title={item.title}
                  subtext={item.category}
                  variant={
                    disabledRows.includes(item.id) ? 'disabled' : 'default'
                  }
                />
                <TableCell>
                  <Input
                    type='number'
                    onChange={(e) => handleChangeQuantity(e, item.id)}
                    disabled={disabledRows.includes(item.id)}
                    className='max-w-[80px]'
                    defaultValue={item.quantity}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked
                    onCheckedChange={() => handleCheckboxChange(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
        {foodEntries.length === 0 && (
          <TableBody>
            <TableCell />
            <TableCell className='text-sm text-neutral-400'>
              no Food items
            </TableCell>
            <TableCell />
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default FoodItemsTable;
