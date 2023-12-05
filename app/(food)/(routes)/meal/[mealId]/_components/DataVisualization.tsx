"use client";

import { useEffect, useState } from "react";

import { useMeal } from "@/context/MealContext";

import DonutChart from "./DonutChart";

const DataVisualization = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { totalNutrients } = useMeal();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center">
        <div className="relative inline-flex">
          <div className="h-4 w-4 rounded-full bg-primary-600"></div>
          <div className="absolute left-0 top-0 h-4 w-4 animate-ping rounded-full bg-primary-600"></div>
          <div className="absolute left-0 top-0 h-4 w-4 animate-pulse rounded-full bg-primary-600"></div>
        </div>
      </div>
    );
  }

  const data = [
    {
      name: "Proteins",
      value: totalNutrients.proteins,
      color: "#0284c7",
    },
    {
      name: "Fats",
      value: totalNutrients.fats,
      color: "#7dd3fc",
    },
    {
      name: "Carbohydrates",
      value: totalNutrients.carbohydrates,
      color: "#0ea5e9",
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
    <div className="flex items-center justify-center gap-6 sm:gap-10">
      <DonutChart data={data} calories={totalNutrients.calories} />

      <div className="flex flex-col truncate text-center font-semibold">
        <span className="text-sm text-primary-500">
          {carbsPercentage?.toFixed(1)}%
        </span>
        <span className="truncate text-sm text-primary-700">
          {totalNutrients.carbohydrates?.toFixed(1) || 0}
        </span>
        <span className="text-xs text-primary-600">Carbs</span>
      </div>

      <div className="flex flex-col truncate text-center font-semibold">
        <span className="text-sm text-primary-300">
          {fatsPercentage?.toFixed(1)}%
        </span>
        <span className="truncate text-sm text-primary-700">
          {totalNutrients.fats?.toFixed(1) || 0}
        </span>
        <span className="text-xs text-primary-600">Fats</span>
      </div>

      <div className="flex flex-col truncate text-center font-semibold">
        <span className="text-sm text-primary-600">
          {proteinsPercentage?.toFixed(1)}%
        </span>
        <span className="truncate text-sm text-primary-700">
          {totalNutrients.proteins?.toFixed(1) || 0}
        </span>
        <span className="text-xs text-primary-600">Proteins</span>
      </div>
    </div>
  );
};

export default DataVisualization;
