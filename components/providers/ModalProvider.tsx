'use client';

import { useEffect, useState } from 'react';

import CreateFoodModal from '@/components/modals/CreateFoodModal';
import FavoritesModal from '@/components/modals/FavoritesModal';
import DeleteFoodModal from '@/components/modals/DeleteFoodModal';
import CalculateCaloriesModal from '@/components/modals/CalculateCaloriesModal';
import ChooseFoodModal from '@/components/modals/ChooseFoodModal';
import CreateMealModal from '@/components/modals/CreateMealModal';
import DeleteMealModal from '@/components/modals/DeleteMealModal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ChooseFoodModal />
      <CreateFoodModal />
      <DeleteFoodModal />
      <CreateMealModal />
      <DeleteMealModal />
      <FavoritesModal />
      <CalculateCaloriesModal />
    </>
  );
};
