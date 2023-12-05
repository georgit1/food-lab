import {
  Food,
  MainNutrient,
  Mineral,
  TraceElement,
  Vitamin,
} from "@prisma/client";

export type WholeFood = Food & MainNutrient & Mineral & TraceElement & Vitamin;

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
    monounsaturated: nutrientData.monounsaturated,
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

type UnitPrefix = "mg" | "µg";

export const convertValueToTargetUnit = <T extends UnitPrefix>(
  value: number,
  sourceUnit: T,
  targetUnit: T,
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

export const parseDecimal = (input: string | number): number => {
  const inputString = typeof input === "number" ? input.toString() : input;
  const parsedValue = parseFloat(inputString?.replace(",", "."));
  return isNaN(parsedValue) ? 0 : parsedValue;
};
