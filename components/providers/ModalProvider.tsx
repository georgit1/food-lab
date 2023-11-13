'use client';

import { useEffect, useState } from 'react';

import CreateFoodModal from '@/components/modals/CreateFoodModal';
import FavoritesModal from '@/components/modals/FavoritesModal';
import DeleteFoodModal from '@/components/modals/DeleteFoodModal';
import CalculateCaloriesModal from '@/components/modals/CalculateCaloriesModal';
import ChooseFoodModal from '../modals/ChooseFoodModal';
import CreateMealModal from '../modals/CreateMealModal';

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
      <FavoritesModal />
      <CalculateCaloriesModal />
    </>
  );
};
