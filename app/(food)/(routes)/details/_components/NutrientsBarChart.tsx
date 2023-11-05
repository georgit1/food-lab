'use client';

import { MainNutrient, Mineral, TraceElement, Vitamin } from '@prisma/client';

import {
  Bar,
  BarChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { convertValueToTargetUnit } from '@/lib/utils';

interface NutrientsBarChartProps {
  nutrients: MainNutrient | Mineral | TraceElement | Vitamin;
  nutrientsItems: string[];
  targetUnit: string;
  requiredNutrients?: Record<string, number>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { unit: string; value: number; requiredValue: number };
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-neutral-300 rounded p-2'>
        {payload[0]?.payload?.requiredValue ? (
          <>
            {' '}
            <p className='text-sm font-semibold'>{label}:</p>
            <p className='text-xs font-semibold'>{`actual: ${payload[0].payload.value}${payload[0].payload.unit}`}</p>
            <p className='text-xs font-semibold'>{`required: ${parseFloat(
              // @ts-ignore
              payload[0]?.payload?.requiredValue
            ).toFixed(1)}${payload[0].payload.unit}`}</p>
          </>
        ) : (
          <p className='text-xs font-semibold'>{`${label}: ${payload[0].payload.value}${payload[0].payload.unit}`}</p>
        )}
      </div>
    );
  }
};

// TODO - maybe optional chart for other unit eg. micro grams
const NutrientsBarChart = ({
  nutrients,
  nutrientsItems,
  targetUnit,
  requiredNutrients,
}: NutrientsBarChartProps) => {
  const data = nutrientsItems.map((nutrient) => {
    // capitalize + add space between lower and uppercase letters
    const nutrientLabel = nutrient
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, (str) => str.toUpperCase());

    if (nutrient in nutrients) {
      const value = nutrients[
        nutrient as keyof typeof nutrients
      ] as unknown as number;

      const requiredValue = requiredNutrients
        ? (requiredNutrients[
            nutrient as keyof typeof nutrients
          ] as unknown as number)
        : null;

      const nutrientUnit = (nutrients as any)[nutrient + 'Unit'];

      const convertedValue = convertValueToTargetUnit(
        value,
        nutrientUnit,
        targetUnit
      );

      return {
        name: nutrientLabel,
        value,
        requiredValue,
        convertedValue,
        unit: nutrientUnit,
      };
    } else {
      return {
        name: nutrientLabel,
        value: 0,
      };
    }
  });

  const filteredData = data.filter((item) => Boolean(item.value));

  return (
    <ResponsiveContainer width='100%' height={250}>
      <BarChart
        width={500}
        height={300}
        data={filteredData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 70,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' angle={-45} textAnchor='end' />
        <Tooltip content={<CustomTooltip />} />
        <YAxis />
        {/* <Legend /> */}
        <Bar dataKey='convertedValue' barSize={10} fill='#0284c7' radius={3} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutrientsBarChart;
