import * as z from "zod";

const isPositiveNumberString = (value: string) => {
  // Allow positive integers or decimals with "." or "," and 0
  const isNumeric = /^[0-9]+([.,][0-9]*)?$/.test(value);
  return isNumeric && parseFloat(value.replace(",", ".")) >= 0;
};

const isPositiveNumberStringOptional = (value: string) => {
  if (value === "") return true;

  // Allow positive integers or decimals with "." or "," and 0
  const isNumeric = /^[0-9]+([.,][0-9]*)?$/.test(value);
  return isNumeric && parseFloat(value.replace(",", ".")) >= 0;
};

export const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  preference: z.string().nullable(),
  isCreator: z.boolean(),

  // Main Nutrients
  calories: z
    .string()
    .min(1, { message: "Calories is required" })
    .refine(isPositiveNumberString, {
      message: "Calories must be a positive number or 0",
    })
    .or(z.number()),
  fats: z
    .string()
    .min(1, { message: "Fats is required" })
    .refine(isPositiveNumberString, {
      message: "Fats must be a positive number or 0",
    })
    .or(z.number()),
  proteins: z
    .string()
    .min(1, { message: "Proteins is required" })
    .refine(isPositiveNumberString, {
      message: "Proteins must be a positive number or 0",
    })
    .or(z.number()),
  carbohydrates: z
    .string()
    .min(1, { message: "Carbohydrates is required" })
    .refine(isPositiveNumberString, {
      message: "Carbohydrates must be a positive number or 0",
    })
    .or(z.number()),
  sugar: z
    .string()
    .min(1, { message: "Sugar is required" })
    .refine(isPositiveNumberString, {
      message: "Sugar must be a positive number or 0",
    })
    .or(z.number()),
  fiber: z
    .string()
    .min(1, { message: "Fiber is required" })
    .refine(isPositiveNumberString, {
      message: "Fiber must be a positive number or 0",
    })
    .or(z.number()),
  salt: z
    .string()
    .min(1, { message: "Salt is required" })
    .refine(isPositiveNumberString, {
      message: "Salt must be a positive number or 0",
    })
    .or(z.number()),
  water: z
    .string({ required_error: "Water is required" })
    .min(1, { message: "Water is required" })
    .refine(isPositiveNumberString, {
      message: "Water must be a positive number or 0",
    })
    .or(z.number()),
  saturated: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Saturated fats must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  monounsaturated: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "monounsaturated fats must be a positive number or 0",
    })
    .or(z.number())
    .optional()
    .nullable(),
  polyunsaturated: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Polyunsaturated fats must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),

  // Minerals
  potassium: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Potassium must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  sodium: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Sodium must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  calcium: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Calcium must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  magnesium: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Magnesium must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  chloride: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Chloride must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  sulfur: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Sulfur must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  phosphorus: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Phosphorus must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),

  // Trace Elements
  iron: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Iron must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  fluoride: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Fluoride must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  copper: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Copper must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  manganese: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Manganese must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  selenium: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Selenium must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  iodine: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Iodine must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  zinc: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Zinc must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),

  // Vitamins
  vitaminA: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin A must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB1: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B1 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB2: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B2 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB3: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B3 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB5: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B5 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB6: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B6 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB7: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B7 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB9: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B9 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminB12: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin B12 must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminC: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin C must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminD: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin D must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminE: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin E must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
  vitaminK: z
    .string()
    .refine(isPositiveNumberStringOptional, {
      message: "Vitamin K must be a positive number or 0",
    })
    .or(z.number())
    .nullable()
    .optional(),
});
