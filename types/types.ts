import {
  Category,
  Food,
  MainNutrient,
  Meal,
  MealFood,
  Mineral,
  TraceElement,
  Vitamin,
} from '@prisma/client';

export type WholeFoodWithCategory = Food & {
  category: Category;
  mainNutrients?: MainNutrient[];
  minerals?: Mineral[];
  traceElements?: TraceElement[];
  vitamins?: Vitamin[];
};

export type WholeFoodWithCategoryWithQuantity = Food & {
  category: Category;
  quantity: number;
  mainNutrients?: MainNutrient[];
  minerals?: Mineral[];
  traceElements?: TraceElement[];
  vitamins?: Vitamin[];
};

export type PreparedMeal = {
  id: string;
  title: string;
  imageUrl: string;
  items: WholeFoodWithCategory[];
};

export type MealWithMealFoodWithFood = Meal & {
  mealFoods: (MealFood & { food: WholeFoodWithCategory })[];
};

export type FoodEntry = {
  id: string;
  title: string;
  imageUrl: string | null;
  // preference: string;
  quantity: number;
  isEnabled: boolean;
  category: string;
  isCreator: boolean;
  nutrients: { [key: string]: number };
};

export type MealEntry = {
  id: string;
  title: string;
  imageUrl: string | null;
  ingredients: string[];
  servings: number;
  isEnabled: boolean;
  nutrients: { [key: string]: number };
};
