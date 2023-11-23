import { Food, Category, MainNutrient } from '@prisma/client';
import FoodCard from './FoodCard';

type FoodWithCategory = Food & {
  category: Category | null;
  mainNutrients: MainNutrient[];
};

interface FoodListProps {
  items: FoodWithCategory[];
}

const FoodList = ({ items }: FoodListProps) => {
  return (
    <div>
      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]'>
        {items.map((item) => (
          <FoodCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            category={item.category?.name}
            calories={item.mainNutrients[0]?.calories}
            proteins={item.mainNutrients[0]?.proteins}
            carbohydrates={item.mainNutrients[0]?.carbohydrates}
            fats={item.mainNutrients[0]?.fats}
            fiber={item.mainNutrients[0]?.fiber}
            isCreator={item.isCreator}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-10'>
          No Food found
        </div>
      )}
    </div>
  );
};

export default FoodList;
