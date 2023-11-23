import { Soup } from 'lucide-react';
import { Meal } from '@prisma/client';

import { ModalType, useModal } from '@/hooks/useModalStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  FoodEntry,
  MealWithMealFoodWithFood,
  WholeFoodWithCategory,
} from '@/types/types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StackedTextWithImage from '@/components/StackedTextWithImage';
import ToggleMealButton from './ToggleMealButton';

interface MealsTabProps {
  foodData: WholeFoodWithCategory[];
  mealData: MealWithMealFoodWithFood[];
}

const MealsTab = ({ foodData, mealData }: MealsTabProps) => {
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData });
  };

  return (
    <ScrollArea className='min-h-[300px] text-center'>
      {/* <div
        className='flex flex-col gap-2 bg-primary-100 rounded-md py-3 px-6 mt-8 text-neutral-50 hover:bg-primary-200/60 cursor-pointer transition'
        onClick={(e) => onAction(e, 'createMeal')}
      >
        <Soup className='mx-auto text-primary-600' size={22} />
        <span className='text-center text-xs text-primary-600 font-semibold'>
          Create a meal
        </span>
      </div> */}
      <div
        className='inline-block bg-primary-100 rounded-md py-3 px-6 mt-6 text-neutral-50 hover:bg-primary-200/60 cursor-pointer transition'
        onClick={(e) => onAction(e, 'createMeal')}
      >
        <Soup className='mx-auto text-primary-600' size={22} />
        <span className='text-center text-xs text-primary-600 font-semibold'>
          Create a meal
        </span>
      </div>
      <Separator className='mt-6' />

      {/* Table */}
      {mealData.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>My Meals</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealData.map((item) => {
              return (
                <TableRow key={item.id}>
                  <StackedTextWithImage
                    imageSrc={item.imageUrl || ''}
                    title={item.title}
                    subtext={item.mealFoods
                      .map((item) => item.food.title)
                      .join(', ')}
                    isMeal={true}
                  />
                  {/* <TableCell> */}
                  {/* {item.preference ? (
                    <span className='whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full'>
                      {item.preference}
                    </span>
                  ) : null} */}
                  {/* </TableCell> */}
                  <TableCell>
                    <ToggleMealButton mealItem={item} mealId={item.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {mealData.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-6'>
          No Food available
        </div>
      )}
    </ScrollArea>
  );
};

export default MealsTab;
