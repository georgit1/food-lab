import { Food, Category, MainNutrient } from '@prisma/client';
import FoodCard from '@/app/(dashboard)/(routes)/(root)/_components/FoodCard';

type FoodWithCategory = Food & {
  category: Category | null;
  mainNutrients: MainNutrient[];
};

interface FoodListProps {
  items: FoodWithCategory[];
}

const FoodList = ({ items }: FoodListProps) => {
  const colorMap: Record<Category['name'], string> = {
    Vegetables: 'category-vegetables',
    Legumes: 'category-leguems',
    'Oils & Fats': 'category-oils_fats',
    Herbs: 'category-herbs',
    Fruits: 'category-fruits',
    Dairy: 'category-dairy',
    Grains: 'category-grains',
    Beverages: 'category-beverages',
    'Nuts & Seeds': 'category-nuts_seeds',
  };

  return (
    <div>
      {/* <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4'> */}
      {/* TODO- following */}
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
            color={colorMap[item.category?.name as Category['name']]}
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
