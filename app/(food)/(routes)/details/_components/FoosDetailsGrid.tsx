import {
  Category,
  Food,
  MainNutrient,
  Mineral,
  TraceElement,
  Vitamin,
} from '@prisma/client';
import GeneralItem from './GeneralItem';

type WholeFood = Food & {
  category: Category;
  mainNutrients?: MainNutrient[];
  minerals?: Mineral[];
  traceElements?: TraceElement[];
  vitamins?: Vitamin[];
};

interface FoodDetailsGridProps {
  foodData: WholeFood;
}

const FoodDetailsGrid = ({ foodData }: FoodDetailsGridProps) => {
  return (
    <div className='grid grid-cols-5 grid-rows-[1fr, 0.3fr, 1fr] mt-8'>
      <GeneralItem
        title={foodData.title}
        category={foodData.category.name}
        imageUrl={foodData.imageUrl || ''}
        preferences={foodData.preferences}
        isCreator={foodData.isCreator}
      />
    </div>
  );
};

export default FoodDetailsGrid;
