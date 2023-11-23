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

// make single data blocks of each nutrient subcategory
export const seperateNutrientData = (nutrientData: WholeFood) => {
  const food = {
    title: nutrientData.title,
    categoryId: nutrientData.categoryId,
    imageUrl: nutrientData.imageUrl,
    preference: nutrientData.preference,
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
};

type UnitPrefix = 'mg' | 'µg';

export const convertValueToTargetUnit = <T extends UnitPrefix>(
  value: number,
  sourceUnit: T,
  targetUnit: T
) => {
  const unitPrefixes: Record<UnitPrefix, number> = {
    mg: 0.001,
    µg: 0.000001,
  };

  // Convert the value to the base unit
  let baseValue = value;
  if (sourceUnit in unitPrefixes) {
    baseValue = value * unitPrefixes[sourceUnit];
  }

  // Convert the base value to the target unit
  let targetValue = baseValue;
  if (targetUnit in unitPrefixes) {
    targetValue = baseValue / unitPrefixes[targetUnit];
  }

  return targetValue;
};

// export const truncateString = (str: string, maxLength: number): string => {
//   if (str.length <= maxLength) {
//     return str;
//   }

//   return `${str.slice(0, maxLength)}...`;
// };

// type WholeNutrients = MainNutrient[] & {
//   minerals?: Mineral[];
//   traceElements?: TraceElement[];
//   vitamins?: Vitamin[];
// };
// type WholeNutrients = MainNutrient[] & {
//   minerals?: Mineral[];
//   traceElements?: TraceElement[];
//   vitamins?: Vitamin[];
// };

// type MergeArrayToSingleObject<T extends object[]> = T extends [] // Base case: empty array
//   ? {}
//   : T extends [infer First, ...infer Rest] // Recursive case: process first element
//   ? First & MergeArrayToSingleObject<Rest>
//   : {};

// // Create the final type by merging the arrays into a single object
// type MergedWholeNutrients = MergeArrayToSingleObject<WholeNutrients[]>;

// export const getFoodCharacteristics = (data: MergedWholeNutrients) => {
//   const characteristics = [];
//   const checkRange = (
//     value: number,
//     lowThreshold: number,
//     highThreshold: number
//   ) => {
//     if (!isNaN(value) && value >= highThreshold) {
//       return 'high';
//     } else if (
//       !isNaN(value) &&
//       value <= highThreshold &&
//       value >= lowThreshold
//     ) {
//       return 'low';
//     }

//     return '';
//   };
//   if (checkRange(data.calories, 0, 50) === 'low') {
//     characteristics.push('low calories');
//   }
//   if (checkRange(data.fats, 0, 10) === 'low') {
//     characteristics.push('low fat');
//   }
//   if (checkRange(data.fiber, 5, 20) === 'high') {
//     characteristics.push('high fiber');
//   }
//   // Add more properties and their desired ranges here.
//   return characteristics;
// };