import React from "react";

interface LegendProps {
  data: { label: string }[];
  colors: string[];
}

const Legend: React.FC<LegendProps> = ({ data, colors }) => {
  return (
    <div className="mb-10 mt-4 flex flex-wrap items-center justify-center space-x-4">
      {data.map((entry, index) => (
        <div key={index} className="flex items-center">
          <div
            className="mr-2 h-3 w-3 rounded-sm"
            style={{ backgroundColor: colors[index] }}
          ></div>
          <span className="text-xs font-semibold text-primary-900">
            {entry.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
