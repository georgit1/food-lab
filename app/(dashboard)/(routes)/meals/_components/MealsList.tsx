import { MealWithMealFoodWithFood } from '@/types/types';
import MealCard from './MealCard';

interface MealsListProps {
  items: MealWithMealFoodWithFood[];
}

const MealsList = ({ items }: MealsListProps) => {
  return (
    <div>
      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]'>
        {items.map((item) => (
          <MealCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            foodTitles={item.mealFoods.map((food) => food.food.title)}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-10'>
          No Meals yet
        </div>
      )}
    </div>
  );
};

export default MealsList;
