import {
  Category,
  Food,
  MainNutrient,
  Mineral,
  TraceElement,
  Vitamin,
} from '@prisma/client';
import GeneralItem from './GeneralItem';
import FoodDensityItem from './FoodDensityItem';
import SubNutrientsItem from './SubnutrientsItem';
import DataItem from './DataItem';
import MainNutrientsItem from './MainNutrientsItem';
import { WholeFoodWithCategory } from '@/types/types';

// type WholeFood = Food & {
//   category: Category;
//   mainNutrients?: MainNutrient[];
//   minerals?: Mineral[];
//   traceElements?: TraceElement[];
//   vitamins?: Vitamin[];
// };

interface FoodDetailsGridProps {
  foodData: WholeFoodWithCategory;
  userId: string;
  requiredNutrients: Record<string, number>;
}

const FoodDetailsGrid = ({
  foodData,
  userId,
  requiredNutrients,
}: FoodDetailsGridProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-[1fr, 0.3fr, 1fr] gap-4 mt-8 mb-2'>
      <GeneralItem
        foodId={foodData.id}
        userId={userId}
        foodCreator={foodData.userId}
        title={foodData.title}
        category={foodData.category.name}
        imageUrl={foodData.imageUrl || ''}
        preference={foodData.preference}
        isCreator={foodData.isCreator}
      />
      {foodData?.mainNutrients?.[0] && (
        <FoodDensityItem mainNutrients={foodData?.mainNutrients?.[0]} />
      )}
      {foodData?.minerals?.[0] &&
        foodData?.traceElements?.[0] &&
        foodData?.vitamins?.[0] && (
          <SubNutrientsItem
            // @ts-expect-error
            minerals={foodData?.minerals?.[0]}
            // @ts-expect-error
            traceElements={foodData?.traceElements?.[0]}
            // @ts-expect-error
            vitamins={foodData?.vitamins?.[0]}
            requiredNutrients={requiredNutrients}
          />
        )}
      {foodData?.mainNutrients?.[0].calories && (
        <DataItem
          label='Energy'
          value={foodData?.mainNutrients?.[0].calories}
          unit='kcal'
          className='order-3 sm:col-span-1 lg:col-span-1 lg:order-4'
        />
      )}
      {foodData?.mainNutrients?.[0].water && (
        <DataItem
          label='Water'
          value={foodData?.mainNutrients?.[0].water}
          unit='ml'
          className='order-4 sm:col-span-1 lg:col-span-1 lg:order-5'
        />
      )}
      {foodData.mainNutrients?.[0] && (
        <MainNutrientsItem
          mainNutrients={foodData.mainNutrients?.[0]}
          requiredNutrients={requiredNutrients}
        />
      )}
    </div>
  );
};

export default FoodDetailsGrid;
