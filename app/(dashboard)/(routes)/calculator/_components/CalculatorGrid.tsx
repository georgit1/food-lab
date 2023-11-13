'use client';

import {
  mineralItems,
  traceElementItems,
  vitaminItems,
} from '@/constants/nutrients';
import DataDisplayItem from './DataDisplayItem';
import FoodTableItem from './FoodTableItem';
import SubnutrientsItem from './SubnutrientsItem';
import { SubNutrient, useCalculator } from '@/context/calculatorContext';
import { WholeFoodWithCategory } from '@/types/types';
import { Mineral, TraceElement, Vitamin } from '@prisma/client';

interface CalculatorGridProps {
  foodData: WholeFoodWithCategory[];
  requiredNutrients: Record<string, number>;
}

const CalculatorGrid = ({
  foodData,
  requiredNutrients,
}: CalculatorGridProps) => {
  const { foodEntries } = useCalculator();
  const foodIds = foodEntries.map((entry) => entry.id);
  const choosenFood = foodData.filter((food) => foodIds.includes(food.id));
  const { totalNutrients }: { totalNutrients: SubNutrient } = useCalculator();

  // extract nutrient values based on what mentioned in the items arrays
  // and also extract associated units from the foodData of the database
  const minerals = mineralItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + 'Unit']:
        foodData[0].minerals?.[0][(item + 'Unit') as keyof Mineral],
    };
  }, {});

  const traceElements = traceElementItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + 'Unit']:
        foodData[0].traceElements?.[0][(item + 'Unit') as keyof TraceElement],
    };
  }, {});

  const vitamins = vitaminItems.reduce((acc, item) => {
    return {
      ...acc,
      [item]: totalNutrients[item],
      [item + 'Unit']:
        foodData[0].vitamins?.[0][(item + 'Unit') as keyof Vitamin],
    };
  }, {});

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
      <FoodTableItem choosenFood={choosenFood} />
      <DataDisplayItem
        totalNutrients={totalNutrients}
        requiredNutrients={requiredNutrients}
      />
      <SubnutrientsItem
        minerals={minerals}
        traceElements={traceElements}
        vitamins={vitamins}
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default CalculatorGrid;
