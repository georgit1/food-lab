"use client";

import { useState } from "react";
import { Category, Food } from "@prisma/client";

import { WholeFoodWithCategory } from "@/types/types";

import { useWeight } from "@/context/WeightContext";
import { NutrientData } from "@/utils/calcPersonalNutrients";
import { WholeFood, seperateNutrientData } from "@/utils/convertUtils";
import {
  NutrientValues,
  calculateCosineSimilarity,
  calculateHealthRating,
  calculateNutrientScore,
  sumCommonNutrientValues,
} from "@/utils/compareUtils";
import Header from "./Header";
import SearchCombobox from "./SearchCombobox";
import SectionProgress from "./SectionProgress";
import NutrientComparison from "./NutrientComparison";
import NutrientsPieChart from "./NutrientsPieChart";
import ComparisonRow from "./ComparisonRow";
import { Separator } from "@/components/ui/separator";
import Legend from "./Legend";

type FoodWithCategory = Food & { category: Category };

interface SplitScreenProps {
  favorites: FoodWithCategory[];
  requiredNutrients: NutrientData;
  foodData: WholeFoodWithCategory[];
}

interface SelectedFoods {
  foodLeft: WholeFoodWithCategory | null;
  foodRight: WholeFoodWithCategory | null;
}

const SplitScreen = ({
  favorites,
  requiredNutrients,
  foodData,
}: SplitScreenProps) => {
  const { nutrientWeights } = useWeight();
  const [selectedFoods, setSelectedFoods] = useState<SelectedFoods>({
    foodLeft: null,
    foodRight: null,
  });

  // prepare one single object with all nutrient data
  const seperatedFoodLeft = seperateNutrientData({
    ...selectedFoods.foodLeft?.mainNutrients?.[0],
    ...selectedFoods.foodLeft?.minerals?.[0],
    ...selectedFoods.foodLeft?.traceElements?.[0],
    ...selectedFoods.foodLeft?.vitamins?.[0],
  } as WholeFood);
  const seperatedFoodRight = seperateNutrientData({
    ...selectedFoods.foodRight?.mainNutrients?.[0],
    ...selectedFoods.foodRight?.minerals?.[0],
    ...selectedFoods.foodRight?.traceElements?.[0],
    ...selectedFoods.foodRight?.vitamins?.[0],
  } as WholeFood);

  // combine to one object
  const fullLeftFood = {
    ...(seperatedFoodLeft?.mainNutrients as NutrientValues),
    ...(seperatedFoodLeft?.minerals as NutrientValues),
    ...(seperatedFoodLeft?.traceElements as NutrientValues),
    ...(seperatedFoodLeft?.vitamins as NutrientValues),
  };

  const fullRightFood = {
    ...(seperatedFoodRight?.mainNutrients as NutrientValues),
    ...(seperatedFoodRight?.minerals as NutrientValues),
    ...(seperatedFoodRight?.traceElements as NutrientValues),
    ...(seperatedFoodRight?.vitamins as NutrientValues),
  };

  // calculate scores
  const leftScore = calculateNutrientScore(fullLeftFood, nutrientWeights);
  const rightScore = calculateNutrientScore(fullRightFood, nutrientWeights);

  // calculate similarity
  const similarity = calculateCosineSimilarity(fullLeftFood, fullRightFood);

  // calculate health rating
  const leftHealthRating = calculateHealthRating(
    fullLeftFood,
    requiredNutrients,
    nutrientWeights,
  );

  const rightHealthRating = calculateHealthRating(
    fullRightFood,
    requiredNutrients,
    nutrientWeights,
  );

  const handleFoodSelection = (
    food: WholeFoodWithCategory | null,
    foodIdentifier: string,
  ) => {
    setSelectedFoods((prevSelectedFoods) => ({
      ...prevSelectedFoods,
      [foodIdentifier]: food,
    }));
  };

  const chartDataLeft = [
    { name: "Calories", value: seperatedFoodLeft?.mainNutrients.calories || 1 },
    { name: "Fats", value: seperatedFoodLeft?.mainNutrients.fats || 1 },
    { name: "Proteins", value: seperatedFoodLeft?.mainNutrients.proteins || 1 },
    {
      name: "Carbohydrates",
      value: seperatedFoodLeft?.mainNutrients.carbohydrates || 1,
    },
    { name: "Sugar", value: seperatedFoodLeft?.mainNutrients.sugar || 1 },
    { name: "Fiber", value: seperatedFoodLeft?.mainNutrients.fiber || 1 },
    { name: "Salt", value: seperatedFoodLeft?.mainNutrients.salt || 1 },
    { name: "Water", value: seperatedFoodLeft?.mainNutrients.water || 1 },
  ];

  const chartDataRight = [
    {
      name: "Calories",
      value: seperatedFoodRight?.mainNutrients.calories || 1,
    },
    { name: "Fats", value: seperatedFoodRight?.mainNutrients.fats || 1 },
    {
      name: "Proteins",
      value: seperatedFoodRight?.mainNutrients.proteins || 1,
    },
    {
      name: "Carbohydrates",
      value: seperatedFoodRight?.mainNutrients.carbohydrates || 1,
    },
    { name: "Sugar", value: seperatedFoodRight?.mainNutrients.sugar || 1 },
    { name: "Fiber", value: seperatedFoodRight?.mainNutrients.fiber || 1 },
    { name: "Salt", value: seperatedFoodRight?.mainNutrients.salt || 1 },
    { name: "Water", value: seperatedFoodRight?.mainNutrients.water || 1 },
  ];

  // calculate totalSum:
  const [totalSumLeft, totalSumRight] = sumCommonNutrientValues(
    { ...fullLeftFood, score: leftScore, healthRating: leftHealthRating },
    { ...fullRightFood, score: rightScore, healthRating: rightHealthRating },
  );

  const legendData = [
    { label: "Calories" },
    { label: "Fats" },
    { label: "Proteins" },
    { label: "Carbs" },
    { label: "Sugar" },
    { label: "Fiber" },
    { label: "Salt" },
    { label: "Water" },
  ];

  const legendColors = [
    "#bae6fd",
    "#7dd3fc",
    "#38bdf8",
    "#0ea5e9",
    "#0284c7",
    "#0369a1",
    "#075985",
    "#0c4a6e",
  ];

  return (
    <div className="relative mt-8 grid min-h-screen grid-cols-2">
      {/* Left side */}
      <div className="bg-primary-50 p-4 text-center">
        <SearchCombobox
          favorites={favorites}
          foodData={foodData}
          identifier="foodLeft"
          onFoodSelection={handleFoodSelection}
        />

        <Header
          title={selectedFoods.foodLeft?.title || ""}
          category={selectedFoods.foodLeft?.category.name || ""}
          imageSrc={selectedFoods.foodLeft?.imageUrl || ""}
          winner={totalSumLeft > totalSumRight}
        />
      </div>

      {/* Right side */}
      <div className="bg-primary-100 p-4 text-center">
        <SearchCombobox
          favorites={favorites}
          foodData={foodData}
          identifier="foodRight"
          onFoodSelection={handleFoodSelection}
        />

        <Header
          title={selectedFoods.foodRight?.title || ""}
          category={selectedFoods.foodRight?.category.name || ""}
          imageSrc={selectedFoods.foodRight?.imageUrl || ""}
          variant="right"
          winner={totalSumRight > totalSumLeft}
        />
      </div>

      {/* centered content */}
      <div className="bg-split-bg absolute left-1/2 top-40 flex w-full -translate-x-1/2 transform flex-col pb-5 text-center">
        <Separator className="mx-auto mb-4 mt-2 h-[1.5px] w-[90%] bg-primary-200" />
        <span className="text-md mb-1 font-semibold text-primary-800">
          Similarity
        </span>
        <span className="mx-auto mb-1 rounded-sm bg-neutral-50 px-3 text-lg font-semibold text-primary-800">
          {similarity?.toFixed(0)}
        </span>
        <SectionProgress value={similarity} />

        <ComparisonRow
          label="Score"
          leftValue={leftScore}
          rightValue={rightScore}
        />
        <ComparisonRow
          label="Healthrating"
          leftValue={leftHealthRating}
          rightValue={rightHealthRating}
        />

        {/* Chart */}
        <div className="mx-auto mt-8 flex h-[155px] w-full max-w-[800px]">
          <NutrientsPieChart data={chartDataLeft} />
          <NutrientsPieChart data={chartDataRight} />
        </div>
        <Legend data={legendData} colors={legendColors} />

        {/* Nutrients Comparison bars*/}
        <NutrientComparison
          food1={{
            ...(seperatedFoodLeft?.mainNutrients as NutrientValues),
            ...(seperatedFoodLeft?.minerals as NutrientValues),
            ...(seperatedFoodLeft?.traceElements as NutrientValues),
            ...(seperatedFoodLeft?.vitamins as NutrientValues),
          }}
          food2={{
            ...(seperatedFoodRight?.mainNutrients as NutrientValues),
            ...(seperatedFoodRight?.minerals as NutrientValues),
            ...(seperatedFoodRight?.traceElements as NutrientValues),
            ...(seperatedFoodRight?.vitamins as NutrientValues),
          }}
        />

        <Separator className="mx-auto my-5 h-[1.5px] w-[90%] bg-primary-200" />
        <ComparisonRow
          label="Total"
          leftValue={totalSumLeft}
          rightValue={totalSumRight}
        />
      </div>
    </div>
  );
};

export default SplitScreen;
