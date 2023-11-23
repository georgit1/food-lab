import {
  FoodEntry,
  MealWithMealFoodWithFood,
  WholeFoodWithCategory,
} from '@/types/types';
import { Category, Food, Meal, User } from '@prisma/client';
import { create } from 'zustand';

export type ModalType =
  | 'createFood'
  | 'editFood'
  | 'deleteFood'
  | 'createMeal'
  | 'deleteMeal'
  | 'favorites'
  | 'calculateCalories'
  | 'chooseFood';

export type ModalUseCase = 'saveMeal' | 'meal';

interface ModalData {
  userData?: User;
  options?: { label: string; value: string }[];
  favorites?: WholeFoodWithCategory[];
  foodData?: WholeFoodWithCategory[] | FoodEntry[];
  // foodData?: FoodEntry[];
  // mealData?: MealWithMealFoodWithFood[];
  mealData?: Meal[];
  mealId?: string;
  title?: string;
  foodId?: string;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  useCase: ModalUseCase | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData, useCase?: ModalUseCase) => void;
  // onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  useCase: null,
  isOpen: false,
  onOpen: (type, data = {}, useCase) =>
    // onOpen: (type, data = {}) =>
    set({ isOpen: true, type, data, useCase }),
  // set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
