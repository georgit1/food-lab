import { redirect } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import FoodDetailsGrid from '../_components/FoodDetailsGrid';
import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';
import { calculateNutrientRequirements } from '@/utils/calcPersonalNutrients';
import { Gender } from '@prisma/client';

const FoodDetailsPage = async ({ params }: { params: { foodId: string } }) => {
  const currentUser = await getCurrentUser();

  // if (
  //   !currentUser?.pal ||
  //   !currentUser?.rmr ||
  //   !currentUser?.age ||
  //   !currentUser?.gender ||
  //   !currentUser?.weight
  // )
  //   return redirect('/');

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
    currentUser?.pal as number,
    currentUser?.rmr as number,
    currentUser?.age as number,
    currentUser?.gender as Gender,
    currentUser?.weight as number
  );

  return (
    <div>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <PageHeader
          header='Food Details'
          subtext='full insight into the food per 100g'
        />

        {/* TODO -back button maybe on navbar or remove completely */}
        {/* <Button variant={'outline'} onClick={() => router.back()}>
          Back
        </Button> */}
      </div>
      <FoodDetailsGrid
        foodData={food}
        userId={currentUser?.id || ''}
        requiredNutrients={requiredNutrients}
      />
    </div>
  );
};

export default FoodDetailsPage;
