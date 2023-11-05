import { MainNutrient } from '@prisma/client';
import NutrientsBarChart from './NutrientsBarChart';

interface MainNutrientsItemProps {
  mainNutrients: MainNutrient;
  requiredNutrients: Record<string, number>;
}

const mainNutrientItems = [
  'fats',
  'saturated',
  'unsaturated',
  'polyunsaturated',
  'proteins',
  'carbohydrates',
  'sugar',
  'fiber',
  'salt',
];

const MainNutrientsItem = ({
  mainNutrients,
  requiredNutrients,
}: MainNutrientsItemProps) => {
  return (
    <div className='col-span-2 order-5 lg:order-6'>
      <NutrientsBarChart
        nutrients={mainNutrients}
        nutrientsItems={mainNutrientItems}
        targetUnit='g'
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default MainNutrientsItem;
