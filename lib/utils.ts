import {
  Food,
  MainNutrient,
  Mineral,
  TraceElement,
  Vitamin,
} from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type WholeFood = Food & MainNutrient & Mineral & TraceElement & Vitamin;

export function seperateNutrientData(nutrientData: WholeFood) {
  const food = {
    title: nutrientData.title,
    categoryId: nutrientData.categoryId,
    imageUrl: nutrientData.imageUrl,
    preferences: nutrientData.preferences,
    isCreator: nutrientData.isCreator,
  };

  const mainNutrients = {
    calories: nutrientData.calories,
    fats: nutrientData.fats,
    saturated: nutrientData.saturated,
    unsaturated: nutrientData.unsaturated,
    polyunsaturated: nutrientData.polyunsaturated,
    proteins: nutrientData.proteins,
    carbohydrates: nutrientData.carbohydrates,
    sugar: nutrientData.sugar,
    fiber: nutrientData.fiber,
    salt: nutrientData.salt,
    water: nutrientData.water,
  };

  const minerals = {
    calcium: nutrientData.calcium,
    chloride: nutrientData.chloride,
    potassium: nutrientData.potassium,
    magnesium: nutrientData.magnesium,
    sodium: nutrientData.sodium,
    phosphorus: nutrientData.phosphorus,
    sulfur: nutrientData.sulfur,
  };

  const traceElements = {
    copper: nutrientData.copper,
    fluoride: nutrientData.fluoride,
    iron: nutrientData.iron,
    iodine: nutrientData.iodine,
    manganese: nutrientData.manganese,
    zinc: nutrientData.zinc,
    selenium: nutrientData.selenium,
  };

  const vitamins = {
    vitaminA: nutrientData.vitaminA,
    vitaminB1: nutrientData.vitaminB1,
    vitaminB2: nutrientData.vitaminB2,
    vitaminB3: nutrientData.vitaminB3,
    vitaminB5: nutrientData.vitaminB5,
    vitaminB6: nutrientData.vitaminB6,
    vitaminB7: nutrientData.vitaminB7,
    vitaminB9: nutrientData.vitaminB9,
    vitaminB12: nutrientData.vitaminB12,
    vitaminC: nutrientData.vitaminC,
    vitaminD: nutrientData.vitaminD,
    vitaminE: nutrientData.vitaminE,
    vitaminK: nutrientData.vitaminK,
  };

  return {
    food,
    mainNutrients,
    minerals,
    traceElements,
    vitamins,
  };
}
