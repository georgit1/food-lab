'use client';

import { MainNutrient } from '@prisma/client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface ChartProps {
  mainNutrients: MainNutrient;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { density: number };
  }[];
  label?: string;
}

const nutrients = [
  'proteins',
  'carbohydrates',
  'fats',
  'fiber',
  'sugar',
  'salt',
];

const nutrientMappings: { [key: string]: string } = {
  carbohydrates: 'Carbs',
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border text-neutral-600 border-neutral-300 rounded p-2'>
        <p className='text-xs font-semibold'>{`${label}: ${payload[0]?.payload?.density?.toFixed(
          0
        )}%`}</p>
      </div>
    );
  }
};

export const DensityChart = ({ mainNutrients }: ChartProps) => {
  const fullMark = 100;
  const data = nutrients.map((nutrient) => {
    // capitalize
    const nutrientLabel =
      nutrientMappings[nutrient] ||
      nutrient.charAt(0).toUpperCase() + nutrient.slice(1);

    if (nutrient in mainNutrients) {
      const nutrientValue = mainNutrients[
        nutrient as keyof typeof mainNutrients
      ] as number;

      const foodDensity = (nutrientValue / fullMark) * 100;

      return {
        nutrient: nutrientLabel,
        density: foodDensity,
        fullMark,
      };
    } else {
      return {
        nutrient: nutrientLabel,
        density: 0,
        fullMark,
      };
    }
  });

  return (
    <ResponsiveContainer width='100%' height={200} className='mt-4'>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey='nutrient'
          tick={{ fill: '#0284c7', fontSize: 12 }}
          className='uppercase'
        />
        <PolarRadiusAxis />
        <Radar
          dataKey='density'
          stroke='#0c4a6e'
          fill='#0284c7'
          fillOpacity={0.6}
        />
        <Tooltip content={<CustomTooltip />} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default DensityChart;
