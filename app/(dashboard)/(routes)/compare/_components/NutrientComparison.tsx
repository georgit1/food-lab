import IconBadge from '@/components/IconBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

interface NutrientComparisonProps {
  food1: Record<string, number>;
  food2: Record<string, number>;
}

const formatNutrientName = (nutrient: string) => {
  const words = nutrient.split(/(?=[A-Z])/);
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  return formattedWords.join(' ');
};

const defaultNutrients = [
  'calories',
  'fats',
  'proteins',
  'carbohydrates',
  'sugar',
  'fiber',
  'salt',
  'water',
];

const NutrientComparison = ({ food1, food2 }: NutrientComparisonProps) => {
  const [showAllNutrients, setShowAllNutrients] = useState(false);

  const nutrients = Object.keys(food1);
  // Filter out nutrients where either food1 or food2 has missing data
  const validNutrients = nutrients.filter(
    (nutrient) =>
      typeof food1[nutrient] === 'number' && typeof food2[nutrient] === 'number'
  );

  const nutrientsToShow = showAllNutrients ? validNutrients : defaultNutrients;

  const hasValues = nutrientsToShow.some(
    (nutrient) => food1[nutrient] && food2[nutrient]
  );

  return (
    <div className='flex flex-col gap-4 px-10 max-w-[650px] w-full mx-auto'>
      {nutrientsToShow.map((nutrient) => (
        <div key={nutrient} className='flex flex-col items-center gap-1'>
          <div className='w-full flex justify-between'>
            <span className='w-16 text-sm text-left text-primary-800 font-bold'>
              {food1[nutrient]?.toFixed(1) || '0.0'}
            </span>
            <div className='text-sm text-primary-800 font-semibold'>
              {formatNutrientName(nutrient)}
            </div>
            <span className='w-16 text-sm text-right text-primary-800 font-bold'>
              {food2[nutrient]?.toFixed(1) || '0.0'}
            </span>
          </div>
          <div className='w-full flex items-center'>
            <div
              className='bg-primary-500 h-1.5 rounded-l-full'
              style={{ width: `${(food1[nutrient] / 2) * 100 || 50}%` }}
            ></div>
            <div
              className='bg-primary-300 h-1.5 rounded-r-full'
              style={{ width: `${(food2[nutrient] / 2) * 100 || 50}%` }}
            ></div>
          </div>
        </div>
      ))}
      {hasValues && (
        <div className='flex col-span-2 mt-4'>
          <div className='flex flex-col gap-1 content-center mx-auto'>
            <span className='mx-auto text-xs text-primary-600 font-semibold'>
              {showAllNutrients ? 'hide full results' : 'full results'}
            </span>
            <span
              className='mx-auto'
              onClick={() => setShowAllNutrients(!showAllNutrients)}
            >
              <IconBadge
                icon={showAllNutrients ? ChevronUp : ChevronDown}
                size='sm'
                className='cursor-pointer'
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutrientComparison;
