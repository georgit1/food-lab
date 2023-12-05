import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface RadialProgessProps {
  value: number;
  maxValue: number;
  label: string;
}

const chartColors = ["#0284c7", "#e2e8f0"];

const RadialProgess = ({ value, maxValue, label }: RadialProgessProps) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const remainingPercentage = 100 - percentage;

  const data = [
    { name: "progress", value: percentage > 3 ? percentage : 3 },
    { name: "remaining", value: remainingPercentage },
  ];

  return (
    <div className="relative -mx-4 min-h-[180px]  w-full max-w-[130px]">
      <ResponsiveContainer
        width="100%"
        height="100%"
        aspect={1}
        className="absolute top-6"
      >
        {value ? (
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={65}
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
          </PieChart>
        ) : (
          <PieChart>
            <Pie
              dataKey="value"
              data={[{ value: 100 }]}
              isAnimationActive={false}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={65}
              fill="#e2e8f0"
            />
          </PieChart>
        )}
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col truncate font-semibold text-primary-600">
        <div className="flex flex-col justify-center">
          <div className="text-md w-full max-w-[70px] truncate text-center font-semibold text-primary-600">
            {value?.toFixed(0) || 0}
          </div>
          <div className="text-md -mt-2 w-full max-w-[70px] truncate text-center font-semibold text-primary-400">
            {maxValue?.toFixed(0) || 0}
          </div>
        </div>
        <span className="mx-auto text-center text-xs font-semibold text-primary-600">
          {label}
        </span>
      </div>
    </div>
  );
};

export default RadialProgess;
