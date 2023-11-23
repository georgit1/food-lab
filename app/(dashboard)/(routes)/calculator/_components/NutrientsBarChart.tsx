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
import { convertValueToTargetUnit } from '@/utils/utils';
import { MineralItemsType } from '@/constants/nutrients';

interface NutrientsBarChartProps {
  nutrients: MainNutrient | MineralItemsType | TraceElement | Vitamin;
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
        value: value?.toFixed(1),
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
    <ResponsiveContainer width='100%' height={250} className='ml-auto mt-4'>
      <BarChart
        data={filteredData}
        margin={{
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' angle={-45} textAnchor='end' />
        <XAxis dataKey='name' xAxisId={1} hide />
        <Tooltip content={<CustomTooltip />} />
        <YAxis />
        <Bar
          dataKey='requiredValue'
          xAxisId={0}
          barSize={10}
          fill='#ccc'
          radius={3}
          fillOpacity={0.7}
        />
        <Bar
          dataKey='convertedValue'
          xAxisId={1}
          barSize={10}
          fill='#0284c7'
          radius={3}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NutrientsBarChart;
