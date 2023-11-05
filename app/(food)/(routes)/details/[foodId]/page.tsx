import { redirect } from 'next/navigation';

import { getFood } from '@/actions/get-food';
import PageHeader from '@/components/PageHeader';
import FoodDetailsGrid from '../_components/FoosDetailsGrid';
import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import { calculateNutrientRequirements } from '@/lib/calcPersonalNutrients';

const FoodDetailsPage = async ({ params }: { params: { foodId: string } }) => {
  // const food = await getFood({ userId: params.foodId });
  const currentUser = await getCurrentUser();

  const food = await db.food.findUnique({
    where: {
      id: params.foodId,
    },
    include: {
      category: true,
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  if (!food) {
    return redirect('/');
  }

  const requiredNutrients = calculateNutrientRequirements(
    currentUser?.pal,
    currentUser?.rmr,
    currentUser?.age,
    currentUser?.gender,
    currentUser?.weight
  );

  return (
    <div>
      <PageHeader
        header='Food Details'
        subtext='full insight into the food per 100g'
      />
      <FoodDetailsGrid
        foodData={food}
        userId={currentUser?.id || ''}
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default FoodDetailsPage;
