import { WholeFoodWithCategory } from '@/types/types';
import RadialProgess from '@/components/RadialProgess';
import { Separator } from '@/components/ui/separator';
import LabeledProgess from './LabeledProgress.tsx';
import { SubNutrient } from '@/context/CalculatorContext.jsx';
import { parseDecimal } from '@/lib/utils';
import { NutrientData } from '@/utils/calcPersonalNutrients.js';

interface DataDisplayItemProps {
  totalNutrients: SubNutrient;
  requiredNutrients: NutrientData;
}

const DataDisplayItem = ({
  totalNutrients,
  requiredNutrients,
}: DataDisplayItemProps) => {
  return (
    <div className='flex justify-center bg-primary-50 rounded-md p-2'>
      <div className='flex flex-col flex-grow gap-4 items-center px-6 pb-2'>
        <RadialProgess
          label='calories'
          value={totalNutrients.calories?.toFixed(0) || 0}
          maxValue={parseDecimal(requiredNutrients.calories).toFixed(0)}
        />
        <div className='w-full space-y-2'>
          <LabeledProgess
            label='Proteins'
            value={totalNutrients.proteins?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.proteins).toFixed(1)}
            unit='g'
          />
          <LabeledProgess
            label='Carbs'
            value={totalNutrients.carbohydrates?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.carbohydrates).toFixed(1)}
            unit='g'
          />
          <LabeledProgess
            label='Fats'
            value={totalNutrients.fats?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.fats).toFixed(1)}
            unit='g'
          />
        </div>
      </div>
      <Separator orientation='vertical' />
      <div className='flex flex-col flex-grow gap-4 items-center px-4'>
        <RadialProgess
          label='water'
          value={totalNutrients.water?.toFixed(0) || 0}
          maxValue={parseDecimal(requiredNutrients.water).toFixed(0)}
        />
        <div className='w-full space-y-2'>
          <LabeledProgess
            label='Fiber'
            value={totalNutrients.fiber?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.fiber).toFixed(1)}
            unit='g'
          />
          <LabeledProgess
            label='Sugar'
            value={totalNutrients.sugar?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.sugar).toFixed(1)}
            unit='g'
          />
          <LabeledProgess
            label='Salt'
            value={totalNutrients.salt?.toFixed(1) || 0}
            maxValue={parseDecimal(requiredNutrients.salt).toFixed(1)}
            unit='g'
          />
        </div>
      </div>
    </div>
  );
};

export default DataDisplayItem;

export const removeTrailingZeros = (num: number): string => {
  const trimmedNum = num.toFixed(2).replace(/\.?0*$/, '');
  return trimmedNum;
};
