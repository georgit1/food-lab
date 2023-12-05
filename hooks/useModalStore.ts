import {
  FoodEntry,
  FoodWithCategoryWithMain,
  WholeFoodWithCategory,
} from "@/types/types";
import { create } from "zustand";
import { Meal, User } from "@prisma/client";

export type ModalType =
  | "createFood"
  | "editFood"
  | "deleteFood"
  | "createMeal"
  | "deleteMeal"
  | "favorites"
  | "calculateCalories"
  | "chooseFood"
  | "adjustWeight";

export type ModalUseCase = "initial" | "meal";

interface ModalData {
  userData?: User;
  options?: { label: string; value: string }[];
  favorites?: FoodWithCategoryWithMain[];
  foodData?: WholeFoodWithCategory[] | FoodEntry[];
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
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  useCase: null,
  isOpen: false,
  onOpen: (type, data = {}, useCase) =>
    set({ isOpen: true, type, data, useCase }),
  onClose: () => set({ type: null, isOpen: false }),
}));
