import { redirect } from 'next/navigation';

import { getFood } from '@/actions/get-food';
import PageHeader from '@/components/PageHeader';
import FoodDetailsGrid from '../_components/FoosDetailsGrid';
import { db } from '@/lib/db';

const FoodDetailsPage = async ({ params }: { params: { foodId: string } }) => {
  // const food = await getFood({ userId: params.foodId });

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

  return (
    <div>
      <PageHeader
        header='Food Details'
        subtext='full insight into the food per 100g'
      />
      <FoodDetailsGrid foodData={food} />
    </div>
  );
};

export default FoodDetailsPage;
