import { useSmallScreen } from '@/hooks/useSmallScreen';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface NutrientsPieChartProps {
  data: { name: string; value: number }[];
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

const chartColors = [
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7',
  '#0369a1',
  '#075985',
  '#0c4a6e',
];

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-neutral-300 rounded p-1'>
        <p className='text-xs font-semibold'>
          {`${payload[0].name}: ${payload[0].value}%`}:
        </p>
      </div>
    );
  }
};

const NutrientsPieChart = ({ data }: NutrientsPieChartProps) => {
  const total = data.reduce((acc, nutrient) => acc + (nutrient.value || 0), 0);
  const isSmallScreen = useSmallScreen();

  // Convert absolute values to percentages
  const dataInPercentage = data.map((nutrient) => ({
    ...nutrient,
    value: Number(((nutrient.value / total) * 100).toFixed(1)),
  }));

  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          dataKey='value'
          isAnimationActive={false}
          data={dataInPercentage}
          cx='50%'
          cy='50%'
          outerRadius={isSmallScreen ? 55 : 75}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
        </Pie>
        {/* <Legend /> */}
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default NutrientsPieChart;
