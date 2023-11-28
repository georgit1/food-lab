import { ScrollArea } from '@/components/ui/scroll-area';
import { Category, Food } from '@prisma/client';
import FoodItemsTable from './FoodItemsTable';
import { WholeFoodWithCategoryWithEnable } from '@/context/CalculatorContext';
import { FoodEntry, MealEntry } from '@/types/types';
import MealItemsTable from './MealItemsTable';

interface FoodTableItemProps {
  foodEntries: FoodEntry[];
  mealEntries: MealEntry[];
}

const FoodTableItem = ({ foodEntries, mealEntries }: FoodTableItemProps) => {
  return (
    <div className='bg-primary-50 rounded-md p-2'>
      <ScrollArea className='h-[300px]'>
        <FoodItemsTable foodEntries={foodEntries} />
        {mealEntries.length > 0 && <MealItemsTable mealEntries={mealEntries} />}
      </ScrollArea>
    </div>
  );
};

export default FoodTableItem;
