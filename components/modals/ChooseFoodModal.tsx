'use client';

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

const ChooseFoodModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { foodData } = data;

  const isModalOpen = isOpen && type === 'chooseFood';

  const personalFoodData = foodData?.filter((food) => food.isCreator === false);

  const tabs = [
    {
      label: 'All Items',
      children: <FoodItemsTab foodData={foodData || []} />,
      id: 'all',
    },
    {
      label: 'My Meals',
      children: <MealsTab />,
      id: 'meals',
    },
    {
      label: 'My Foods',
      children: <FoodItemsTab foodData={personalFoodData || []} />,
      id: 'foods',
    },
  ];

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-primary-600'>Choose Foods</DialogTitle>
          <DialogDescription className='text-primary-400'>
            Browse your favorite foods
          </DialogDescription>
        </DialogHeader>
        <Tabs tabs={tabs} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseFoodModal;
