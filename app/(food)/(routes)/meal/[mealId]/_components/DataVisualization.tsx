'use client';

import { useMeal } from '@/context/mealContext';
import DonutChart from '@/app/(food)/(routes)/meal/[mealId]/_components/DonutChart';
import { useEffect, useState } from 'react';

const DataVisualization = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { totalNutrients } = useMeal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className='flex justify-center items-center'>
        <div className='relative inline-flex'>
          <div className='w-4 h-4 bg-primary-600 rounded-full'></div>
          <div className='w-4 h-4 bg-primary-600 rounded-full absolute top-0 left-0 animate-ping'></div>
          <div className='w-4 h-4 bg-primary-600 rounded-full absolute top-0 left-0 animate-pulse'></div>
        </div>
      </div>
    );
  }

  const data = [
    {
      name: 'Proteins',
      value: totalNutrients.proteins,
      color: '#0284c7',
    },
    {
      name: 'Fats',
      value: totalNutrients.fats,
      color: '#7dd3fc',
    },
    {
      name: 'Carbohydrates',
      value: totalNutrients.carbohydrates,
      color: '#0ea5e9',
    },
  ];

  // calc individual percentages
  const sum =
    totalNutrients.fats +
    totalNutrients.proteins +
    totalNutrients.carbohydrates;

  const fatsPercentage = (totalNutrients.fats / sum) * 100 || 0;
  const proteinsPercentage = (totalNutrients.proteins / sum) * 100 || 0;
  const carbsPercentage = (totalNutrients.carbohydrates / sum) * 100 || 0;

  return (
    <div className='flex gap-6 sm:gap-10 items-center justify-center'>
      <DonutChart data={data} calories={totalNutrients.calories} />

      <div className='flex flex-col font-semibold'>
        <span className='teext-xs text-primary-500'>
          {carbsPercentage?.toFixed(1)}%
        </span>
        <span className='text-sm text-primary-700'>
          {totalNutrients.carbohydrates?.toFixed(1) || 0}
        </span>
        <span className='text-xs text-primary-600'>Carbs</span>
      </div>

      <div className='flex flex-col font-semibold'>
        <span className='teext-xs text-primary-300'>
          {fatsPercentage?.toFixed(1)}%
        </span>
        <span className='text-sm text-primary-700'>
          {totalNutrients.fats?.toFixed(1) || 0}
        </span>
        <span className='text-xs text-primary-600'>Fats</span>
      </div>

      <div className='flex flex-col font-semibold'>
        <span className='teext-xs text-primary-600'>
          {proteinsPercentage?.toFixed(1)}%
        </span>
        <span className='text-sm text-primary-700'>
          {totalNutrients.proteins?.toFixed(1) || 0}
        </span>
        <span className='text-xs text-primary-600'>Proteins</span>
      </div>
    </div>
  );
};

export default DataVisualization;
