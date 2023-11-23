// type below is effectively an object type where keys are strings
// from mainNutrientItems array, and values are numbers
export type MainNutrientItemsType = {
  [key in (typeof mainNutrientItems)[number]]: number;
};

export const mainNutrientItems = [
  'calories',
  'fats',
  'saturated',
  'unsaturated',
  'polyunsaturated',
  'proteins',
  'carbohydrates',
  'sugar',
  'fiber',
  'salt',
  'water',
];

export type MineralItemsType = {
  [key in (typeof mineralItems)[number]]: number;
};

export const mineralItems = [
  'calcium',
  'chloride',
  'potassium',
  'magnesium',
  'sodium',
  'phosphorus',
  'sulfur',
];

export type TraceElementItemsType = {
  [key in (typeof traceElementItems)[number]]: number;
};

export const traceElementItems = [
  'copper',
  'fluoride',
  'iron',
  'iodine',
  'manganese',
  'zinc',
  'selenium',
];

export type VitaminItemsType = {
  [key in (typeof vitaminItems)[number]]: number;
};

export const vitaminItems = [
  'vitaminA',
  'vitaminB1',
  'vitaminB2',
  'vitaminB3',
  'vitaminB5',
  'vitaminB6',
  'vitaminB7',
  'vitaminB9',
  'vitaminB12',
  'vitaminC',
  'vitaminD',
  'vitaminE',
  'vitaminK',
];

export const nutrients = [
  'calories',
  'fats',
  'saturated',
  'unsaturated',
  'polyunsaturated',
  'proteins',
  'carbohydrates',
  'sugar',
  'fiber',
  'salt',
  'water',
  'calcium',
  'chloride',
  'potassium',
  'magnesium',
  'sodium',
  'phosphorus',
  'sulfur',
  'copper',
  'fluoride',
  'iron',
  'iodine',
  'manganese',
  'zinc',
  'selenium',
  'vitaminA',
  'vitaminB1',
  'vitaminB2',
  'vitaminB3',
  'vitaminB5',
  'vitaminB6',
  'vitaminB7',
  'vitaminB9',
  'vitaminB12',
  'vitaminC',
  'vitaminD',
  'vitaminE',
  'vitaminK',
];
