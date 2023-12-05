import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';
import { MealWithMealFoodWithFood } from '@/types/types';

import MealsList from './_components/MealsList';
import PageHeader from '@/components/PageHeader';

interface MealsPageProps {}
const MealsPage = async ({}: MealsPageProps) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect('/');

  const meals = await db.meal.findMany({
    where: {
      userId: currentUser?.id,
      mealFoods: {
        some: {},
      },
    },
    include: {
      mealFoods: {
        include: {
          food: true,
        },
      },
    },
  });

  return (
    <div className='space-y-5 pb-4'>
      <PageHeader header='My Personal Meals' />

      <MealsList items={meals as MealWithMealFoodWithFood[]} />
    </div>
  );
};

export default MealsPage;
