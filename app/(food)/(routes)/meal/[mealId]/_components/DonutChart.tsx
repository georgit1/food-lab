import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="z-50 rounded border border-neutral-300 bg-white p-1">
        <p className="text-xs font-semibold">
          {`${payload[0].name}: ${payload[0].value}%`}:
        </p>
      </div>
    );
  }
};

const chartColors = ["#0284c7", "#7dd3fc", "#0ea5e9"];

const DonutChart = ({ data, calories }: DonutChartProps) => {
  const total = data.reduce((acc, nutrient) => acc + (nutrient.value || 0), 0);

  // Convert absolute values to percentages
  const dataInPercentage = data.map((nutrient) => ({
    ...nutrient,
    value: Number(((nutrient.value / total) * 100).toFixed(1)),
  }));

  return (
    <div className="relative w-full max-w-[115px]">
      <ResponsiveContainer width="100%" height="100%" aspect={1}>
        {data.some((item) => item.value === undefined) ? (
          <PieChart>
            <Pie
              dataKey="value"
              data={[{ value: 100 }]}
              isAnimationActive={false}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={50}
              fill="#e2e8f0"
            />
          </PieChart>
        ) : (
          <PieChart>
            <Pie
              dataKey="value"
              data={dataInPercentage}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={50}
              cornerRadius={12}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                  style={{ outline: "none" }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        )}
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 -z-50 flex -translate-x-1/2 -translate-y-1/2 transform flex-col truncate font-semibold text-primary-600">
        <span className="text-md mx-auto w-full max-w-[75px] truncate text-center">
          {calories?.toFixed(1) || 0}
        </span>
        <span className="mx-auto text-xs">Calories</span>
      </div>
    </div>
  );
};

export default DonutChart;
