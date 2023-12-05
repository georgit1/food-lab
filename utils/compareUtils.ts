import { parseDecimal } from "./convertUtils";
import { NutrientData } from "./calcPersonalNutrients";

export type NutrientValues = {
  [key: string]: number;
};

type NutrientWeights = {
  [key: string]: number;
};

export const calculateNutrientScore = (
  nutrientValues: NutrientValues,
  nutrientWeights: NutrientWeights,
) => {
  const totalWeight = Object.values(nutrientWeights).reduce(
    (acc, weight) => acc + weight,
    0,
  );

  // Normalize each nutrient value based on the sum of weights
  const normalizedNutrients: NutrientValues = {};
  Object.entries(nutrientValues).forEach(([nutrient, value]) => {
    const weight = nutrientWeights[nutrient];
    normalizedNutrients[nutrient] = weight / totalWeight;
  });

  const totalScore: number = Object.entries(normalizedNutrients).reduce(
    (acc, [nutrient, normalizedValue]) => {
      const nutrientValue = nutrientValues[nutrient];
      return acc + nutrientValue * normalizedValue;
    },
    0,
  );

  return totalScore || 0;
};

// Function to fill missing nutrient values with zeros
const fillMissingNutrients = (
  nutrientValues: NutrientValues,
  allNutrients: string[],
): NutrientValues => {
  return allNutrients.reduce((values, nutrient) => {
    values[nutrient] = nutrientValues[nutrient] || 0;
    return values;
  }, {} as NutrientValues);
};

// Function to calculate cosine similarity
export const calculateCosineSimilarity = (
  nutrientValues1: NutrientValues,
  nutrientValues2: NutrientValues,
): number => {
  // Ensure both sets of nutrient values have the same nutrients
  const allNutrients = [
    ...new Set([
      ...Object.keys(nutrientValues1),
      ...Object.keys(nutrientValues2),
    ]),
  ];

  // Fill in missing nutrient values with zeros
  const filledNutrientValues1 = fillMissingNutrients(
    nutrientValues1,
    allNutrients,
  );
  const filledNutrientValues2 = fillMissingNutrients(
    nutrientValues2,
    allNutrients,
  );

  // Calculate dot product
  const dotProduct = allNutrients.reduce(
    (sum, nutrient) =>
      sum + filledNutrientValues1[nutrient] * filledNutrientValues2[nutrient],
    0,
  );

  // Calculate magnitudes
  const magnitude1 = Math.sqrt(
    allNutrients.reduce(
      (sum, nutrient) => sum + filledNutrientValues1[nutrient] ** 2,
      0,
    ),
  );

  const magnitude2 = Math.sqrt(
    allNutrients.reduce(
      (sum, nutrient) => sum + filledNutrientValues2[nutrient] ** 2,
      0,
    ),
  );

  // Calculate cosine similarity
  const similarity = (dotProduct / (magnitude1 * magnitude2)) * 100;

  return similarity || 0;
};

export const calculateHealthRating = (
  nutrientValues: NutrientValues,
  nutrientNeeds: NutrientData,
  nutrientWeights: NutrientWeights,
): number => {
  const allNutrients = Object.keys(nutrientValues);

  const totalScore = allNutrients.reduce((sum, nutrient) => {
    const value = nutrientValues[nutrient] || 0;
    const need = parseDecimal(nutrientNeeds[nutrient] || 1);
    const weight = nutrientWeights[nutrient] || 1;

    const nutrientScore = (value / need) * (weight / 100);

    return sum + nutrientScore;
  }, 0);

  return totalScore * 100 || 0;
};

interface Food {
  [nutrient: string]: number | null | undefined;
}

export const sumCommonNutrientValues = (
  foodLeft: Food,
  foodRight: Food,
): number[] => {
  // Get a list of common nutrients from both foods
  const commonNutrients = Object.keys(foodLeft).filter(
    (nutrient) =>
      foodRight.hasOwnProperty(nutrient) &&
      foodLeft[nutrient] != null &&
      foodRight[nutrient] != null,
  );

  // Sum common nutrients for foodLeft and foodRight
  const totalSumLeft = commonNutrients.reduce(
    (sum, nutrient) => sum + (foodLeft[nutrient] as number),
    0,
  );

  const totalSumRight = commonNutrients.reduce(
    (sum, nutrient) => sum + (foodRight[nutrient] as number),
    0,
  );

  return [totalSumLeft, totalSumRight];
};
