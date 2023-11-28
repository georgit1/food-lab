import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface ChartDataItem {
  name: string;
  value: number;
  color?: string;
  count?: number;
}

interface DonutChartProps {
  data: ChartDataItem[];
  calories: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: { name: string; value: number };
  }[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-neutral-300 rounded p-1'>
        <p className='text-sm font-semibold'>
          {`${payload[0].name}: ${payload[0].value}%`}:
        </p>
      </div>
    );
  }
};

const chartColors = ['#0284c7', '#7dd3fc', '#0ea5e9'];

const DonutChart = ({ data, calories }: DonutChartProps) => {
  const total = data.reduce((acc, nutrient) => acc + (nutrient.value || 0), 0);

  // Convert absolute values to percentages
  const dataInPercentage = data.map((nutrient) => ({
    ...nutrient,
    value: Number(((nutrient.value / total) * 100).toFixed(1)),
  }));

  return (
    <div className='relative w-full max-w-[115px]'>
      <ResponsiveContainer width='100%' height='100%' aspect={1}>
        <PieChart>
          <Pie
            dataKey='value'
            isAnimationActive={false}
            data={dataInPercentage}
            cx='50%'
            cy='50%'
            innerRadius={40}
            outerRadius={50}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600 font-semibold'>
        <span className='text-md mx-auto'>{calories?.toFixed(1) || 0}</span>
        <span className='text-xs mx-auto'>Calories</span>
      </div>
    </div>
  );
};

export default DonutChart;
