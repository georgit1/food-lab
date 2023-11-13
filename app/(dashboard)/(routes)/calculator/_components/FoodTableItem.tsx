import { ScrollArea } from '@/components/ui/scroll-area';
import { Category, Food } from '@prisma/client';
import FoodItemsTable from './FoodItemsTable';

type FoodWithCategory = Food & {
  category: Category;
};

interface FoodTableItemProps {
  choosenFood: FoodWithCategory[];
}

const FoodTableItem = ({ choosenFood }: FoodTableItemProps) => {
  return (
    <div className='bg-primary-50 rounded-md p-2'>
      <ScrollArea className='h-[300px]'>
        <FoodItemsTable choosenFood={choosenFood} />
        {/* <MealItemsTable/> */}
        {/* <NutrientsTable
    nutrients={minerals}
    nutrientsItems={mineralItems}
    requiredNutrients={requiredNutrients}
  /> */}
      </ScrollArea>
    </div>
  );
};

export default FoodTableItem;
