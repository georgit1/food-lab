// import csvData from '@/public/';
import { parseDecimal } from '@/lib/utils';
import csvData from '../public/data_who.csv';

type Gender = 'MALE' | 'FEMALE';

export type NutrientData = {
  [key: string]: string | number;
};

export const calculateNutrientRequirements = (
  palValue: number,
  rmr: number,
  age: number,
  gender: Gender,
  weight: number
) => {
  const calories = rmr * palValue;

  const nutrients: Record<string, number> = {
    calories,
    fats: (calories * getCsvValue(age, gender, 'fats')) / 100 / 9,
    saturated: (calories * getCsvValue(age, gender, 'saturated')) / 100 / 9,
    // TODO - unsaturated, polyunsaturated, as well as in excel
    // const unsaturated = (calories * getCsvValue(age, gender, 'unsaturated')) / 100 / 9;
    // const polyunsaturated = (calories * getCsvValue(age, gender, 'polyunsaturated')) / 100 / 9;
    carbohydrates: calories * 0.55 * 0.24,
    sugar: (calories * getCsvValue(age, gender, 'sugar')) / 100 / 3.87,
    proteins: (calories * 0.15 * 0.24) / 4,
    fiber: getCsvValue(age, gender, 'fiber'),
    water: getCsvValue(age, gender, 'water') * weight,
    salt: getCsvValue(age, gender, 'salt'),
    potassium: getCsvValue(age, gender, 'potassium'),
    sodium: getCsvValue(age, gender, 'sodium'),
    calcium: getCsvValue(age, gender, 'calcium'),
    magnesium: getCsvValue(age, gender, 'magnesium'),
    chloride: getCsvValue(age, gender, 'chloride'),
    sulfur: getCsvValue(age, gender, 'sulfur') * weight,
    phosphorus: getCsvValue(age, gender, 'phosphorus'),
    iron: getCsvValue(age, gender, 'iron'),
    fluoride: getCsvValue(age, gender, 'fluoride'),
    copper: getCsvValue(age, gender, 'copper'),
    manganese: getCsvValue(age, gender, 'manganese'),
    selenium: getCsvValue(age, gender, 'selenium'),
    iodine: getCsvValue(age, gender, 'iodine'),
    zinc: getCsvValue(age, gender, 'zinc'),
    vitaminA: getCsvValue(age, gender, 'vitaminA'),
    vitaminB1: getCsvValue(age, gender, 'vitaminB1'),
    vitaminB2: getCsvValue(age, gender, 'vitaminB2'),
    vitaminB3: getCsvValue(age, gender, 'vitaminB3'),
    vitaminB5: getCsvValue(age, gender, 'vitaminB5'),
    vitaminB6: getCsvValue(age, gender, 'vitaminB6'),
    vitaminB7: getCsvValue(age, gender, 'vitaminB7'),
    vitaminB9: getCsvValue(age, gender, 'vitaminB9'),
    vitaminB12: getCsvValue(age, gender, 'vitaminB12'),
    vitaminC: getCsvValue(age, gender, 'vitaminC'),
    vitaminD: getCsvValue(age, gender, 'vitaminD'),
    vitaminE: getCsvValue(age, gender, 'vitaminE'),
    vitaminK: getCsvValue(age, gender, 'vitaminK'),
  };

  // parse string values from csv to float
  const parsedNutrients: NutrientData = {};

  for (const key in nutrients) {
    if (Object.prototype.hasOwnProperty.call(nutrients, key)) {
      parsedNutrients[key] = parseDecimal(nutrients[key]);
    }
  }

  return parsedNutrients;
};

export const getCsvValue = (age: number, gender: Gender, item: string) => {
  // Find the matching row in the CSV table based on age, gender, and item
  const matchingRow = csvData.find((row: string[]) => {
    const [csvItem, csvAge, valueMale, valueFemale, unit] = row;

    if (typeof csvAge === 'string' && csvAge.trim() !== '') {
      const [minAge, maxAge] = csvAge.split(' to under ');
      return (
        csvItem === item &&
        age >= parseInt(minAge, 10) &&
        (maxAge === ' years' || age < parseInt(maxAge, 10)) &&
        (gender === 'MALE' ? valueMale : valueFemale)
      );
    }
    return false;
  });

  // Extract the value based on gender
  if (matchingRow) {
    const [_, __, valueMale, valueFemale] = matchingRow;
    return gender === 'MALE' ? valueMale : valueFemale;
  }

  return null;
};
