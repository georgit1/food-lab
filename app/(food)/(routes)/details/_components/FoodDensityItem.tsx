import { MainNutrient } from '@prisma/client';
import DensityChart from './DensityChart';

interface FoodDensityItemProps {
  mainNutrients: MainNutrient;
}

const FoodDensityItem = ({ mainNutrients }: FoodDensityItemProps) => {
  return (
    <div className='relative col-span-2 sm:col-span-2 lg:col-span-1 order-2 bg-primary-50 rounded-md p-2 pb-0 overflow-hidden'>
      <div className='absolute bottom-2 right-2 z-10 text-primary-600 text-xs font-semibold'>
        % per 100 kcal
      </div>
      <h3 className='text-lg text-primary-600 font-semibold'>Food Density</h3>
      <DensityChart mainNutrients={mainNutrients} />
    </div>
  );
};

export default FoodDensityItem;
