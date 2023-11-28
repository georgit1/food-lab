'use client';

import { useState } from 'react';
import { Category, Food } from '@prisma/client';

import { WholeFoodWithCategory } from '@/types/types';

import { useWeight } from '@/context/WeightContext';
import { WholeFood, seperateNutrientData } from '@/lib/utils';
import { NutrientData } from '@/utils/calcPersonalNutrients';
import {
  NutrientValues,
  calculateCosineSimilarity,
  calculateHealthRating,
  calculateNutrientScore,
  sumCommonNutrientValues,
} from '@/utils/compareUtils';
import Header from './Header';
import SearchCombobox from './SearchCombobox';
import SectionProgress from './SectionProgress';
import NutrientComparison from './NutrientComparison';
import NutrientsPieChart from './NutrientsPieChart';
import ComparisonRow from './ComparisonRow';
import { Separator } from '@/components/ui/separator';

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

// TODO - span background full height
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
    nutrientWeights
  );
  // const leftHealthRating = calculateHealthRating(
  //   {
  //     calories: 120,
  //     proteins: 12,
  //     fats: 30,
  //     carbohydrates: 45,
  //     fiber: 8,
  //     salt: 2,
  //   },
  //   {
  //     calories: 2700,
  //     proteins: 75,
  //     fats: 60,
  //     carbohydrates: 280,
  //     fiber: 30,
  //     salt: 5,
  //   },
  //   {
  //     calories: 0.1,
  //     proteins: 0.2,
  //     fats: 0.15,
  //     carbohydrates: 0.2,
  //     fiber: 1,
  //     salt: 1,
  //   }
  // );
  const rightHealthRating = calculateHealthRating(
    fullRightFood,
    requiredNutrients,
    nutrientWeights
  );

  const handleFoodSelection = (
    food: WholeFoodWithCategory | null,
    foodIdentifier: string
  ) => {
    setSelectedFoods((prevSelectedFoods) => ({
      ...prevSelectedFoods,
      [foodIdentifier]: food,
    }));
  };

  const chartDataLeft = [
    { name: 'Calories', value: seperatedFoodLeft?.mainNutrients.calories || 1 },
    { name: 'Fats', value: seperatedFoodLeft?.mainNutrients.fats || 1 },
    { name: 'Proteins', value: seperatedFoodLeft?.mainNutrients.proteins || 1 },
    {
      name: 'Carbohydrates',
      value: seperatedFoodLeft?.mainNutrients.carbohydrates || 1,
    },
    { name: 'Sugar', value: seperatedFoodLeft?.mainNutrients.sugar || 1 },
    { name: 'Fiber', value: seperatedFoodLeft?.mainNutrients.fiber || 1 },
    { name: 'Salt', value: seperatedFoodLeft?.mainNutrients.salt || 1 },
    { name: 'Water', value: seperatedFoodLeft?.mainNutrients.water || 1 },
  ];

  const chartDataRight = [
    {
      name: 'Calories',
      value: seperatedFoodRight?.mainNutrients.calories || 1,
    },
    { name: 'Fats', value: seperatedFoodRight?.mainNutrients.fats || 1 },
    {
      name: 'Proteins',
      value: seperatedFoodRight?.mainNutrients.proteins || 1,
    },
    {
      name: 'Carbohydrates',
      value: seperatedFoodRight?.mainNutrients.carbohydrates || 1,
    },
    { name: 'Sugar', value: seperatedFoodRight?.mainNutrients.sugar || 1 },
    { name: 'Fiber', value: seperatedFoodRight?.mainNutrients.fiber || 1 },
    { name: 'Salt', value: seperatedFoodRight?.mainNutrients.salt || 1 },
    { name: 'Water', value: seperatedFoodRight?.mainNutrients.water || 1 },
  ];

  // calculate totalSum:

  const [totalSumLeft, totalSumRight] = sumCommonNutrientValues(
    { ...fullLeftFood, score: leftScore, healthRating: leftHealthRating },
    { ...fullRightFood, score: rightScore, healthRating: rightHealthRating }
  );

  return (
    <div className='relative grid grid-cols-2 min-h-screen mt-8'>
      {/* Left side */}
      <div className='bg-primary-50 p-4 text-center'>
        <SearchCombobox
          favorites={favorites}
          foodData={foodData}
          identifier='foodLeft'
          onFoodSelection={handleFoodSelection}
        />

        <Header
          title={selectedFoods.foodLeft?.title || ''}
          category={selectedFoods.foodLeft?.category.name || ''}
          imageSrc={selectedFoods.foodLeft?.imageUrl || ''}
          winner={totalSumLeft > totalSumRight}
        />
      </div>

      {/* Right side */}
      <div className='bg-primary-100 p-4 text-center'>
        <SearchCombobox
          favorites={favorites}
          foodData={foodData}
          identifier='foodRight'
          onFoodSelection={handleFoodSelection}
        />

        <Header
          title={selectedFoods.foodRight?.title || ''}
          category={selectedFoods.foodRight?.category.name || ''}
          imageSrc={selectedFoods.foodRight?.imageUrl || ''}
          variant='right'
          winner={totalSumRight > totalSumLeft}
        />
      </div>

      {/* centered content */}
      <div className='absolute w-full flex flex-col top-40 left-1/2 transform -translate-x-1/2 text-center pb-8'>
        {/* <div className='col-span-2 w-full flex flex-col text-center pb-8'> */}
        <Separator className='w-[90%] h-[1.5px] mx-auto mt-2 mb-4 bg-primary-200' />
        <span className='text-md text-primary-800 font-semibold'>
          Similarity
        </span>
        <span className='text-lg bg-neutral-50 text-primary-800 font-semibold px-3 mx-auto rounded-sm'>
          {similarity?.toFixed(0)}
        </span>
        <SectionProgress value={similarity} />

        <ComparisonRow
          label='Score'
          leftValue={leftScore}
          rightValue={rightScore}
        />
        <ComparisonRow
          label='Healthrating'
          leftValue={leftHealthRating}
          rightValue={rightHealthRating}
        />

        {/* Chart */}
        <div className='flex h-[250px] w-full max-w-[800px] mx-auto'>
          {/* TODO - maybe legend in middle */}
          <NutrientsPieChart data={chartDataLeft} />
          <NutrientsPieChart data={chartDataRight} />
        </div>

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

        <Separator className='w-[90%] h-[1.5px] mx-auto my-5 bg-primary-200' />
        <ComparisonRow
          label='Total'
          leftValue={totalSumLeft}
          rightValue={totalSumRight}
        />
      </div>
    </div>
  );
};

export default SplitScreen;
