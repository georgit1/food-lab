import { redirect } from 'next/navigation';

import getCurrentUser from '@/utils/getCurrentUser';
import { db } from '@/lib/db';

import CreateMealForm from './_components/CreateMealForm';
import MealHeader from './_components/MealHeader';
import MealFoodItemsTable from './_components/MealFoodItemsTable';
import { Separator } from '@/components/ui/separator';
import DataVisualization from './_components/DataVisualization';

const MealPage = async ({ params }: { params: { mealId: string } }) => {
  const currentUser = await getCurrentUser();
  const { mealId } = params;

  if (!currentUser?.id || !currentUser?.email) {
    return redirect('/');
  }

  const food = await db.food.findMany({
    where: {
      OR: [{ userId: currentUser.id }, { isCreator: true }],
    },
    include: {
      category: true,
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  const meal = await db.meal.findUnique({
    where: {
      id: mealId,
      userId: currentUser.id,
    },
    include: {
      mealFoods: {
        include: {
          food: {
            include: {
              category: true,
              mainNutrients: true,
              minerals: true,
              traceElements: true,
              vitamins: true,
            },
          },
        },
      },
    },
  });

  if (!food || !meal) {
    return redirect('/');
  }

  return (
    <>
      <MealHeader foodData={food} />

      <div className='max-w-xl mx-auto mt-8 space-y-5'>
        <CreateMealForm initialData={meal} mealId={meal.id} />
        <Separator />
        <DataVisualization />
        <MealFoodItemsTable initialData={meal} />
      </div>
    </>
  );
};

export default MealPage;
