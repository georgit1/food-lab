import { useModal } from '@/hooks/useModalStore';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Tabs from '@/app/(dashboard)/(routes)/calculator/_components/Tabs';
import FoodItemsTab from '@/app/(dashboard)/(routes)/calculator/_components/FoodItemsTab';
import MealsTab from '@/app/(dashboard)/(routes)/calculator/_components/MealsTab';
import { MealWithMealFoodWithFood, WholeFoodWithCategory } from '@/types/types';

const ChooseFoodModal = () => {
  const { isOpen, onClose, type, data, useCase } = useModal();
  const { foodData, mealData } = data;

  const isModalOpen = isOpen && type === 'chooseFood';

  // extract only personal created food
  const personalFoodData = foodData?.filter((food) => food.isCreator === false);

  const tabs = [];

  if (!useCase) {
    tabs.push(
      {
        label: 'All Items',
        children: (
          <FoodItemsTab
            foodData={(foodData as WholeFoodWithCategory[]) || []}
          />
        ),
        id: 'all',
      },
      {
        label: 'My Meals',
        children: (
          <MealsTab
            foodData={(foodData as WholeFoodWithCategory[]) || []}
            mealData={(mealData as MealWithMealFoodWithFood[]) || []}
          />
        ),
        id: 'meals',
      },
      {
        label: 'My Foods',
        children: (
          <FoodItemsTab
            foodData={(personalFoodData as WholeFoodWithCategory[]) || []}
          />
        ),
        id: 'foods',
      }
    );
  } else if (useCase === 'meal') {
    tabs.push(
      {
        label: 'All Items',
        children: (
          <FoodItemsTab
            foodData={(foodData as WholeFoodWithCategory[]) || []}
            useCase={useCase}
          />
        ),
        id: 'all',
      },
      {
        label: 'My Foods',
        children: (
          <FoodItemsTab
            foodData={(personalFoodData as WholeFoodWithCategory[]) || []}
            useCase={useCase}
          />
        ),
        id: 'foods',
      }
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-primary-800'>Choose Foods</DialogTitle>
          <DialogDescription className='text-neutral-500'>
            Browse your favorite foods
          </DialogDescription>
        </DialogHeader>
        <Tabs tabs={tabs} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseFoodModal;
