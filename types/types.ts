import {
  Category,
  Food,
  MainNutrient,
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
