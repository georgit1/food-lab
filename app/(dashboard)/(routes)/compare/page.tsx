import { redirect } from 'next/navigation';

import SplitScreen from './_components/SplitScreen';
import getCurrentUser from '@/utils/getCurrentUser';
import { getFavorites } from '@/actions/get-favorites';
import { db } from '@/lib/db';
import CompareHeader from './_components/CompareHeader';
import { calculateNutrientRequirements } from '@/utils/calcPersonalNutrients';
import { Gender } from '@prisma/client';

const ComparePage = async () => {
  const currentUser = await getCurrentUser();

  // TODO - compare page should be accessable for non logged in user
  // if (
  //   !currentUser?.pal ||
  //   !currentUser?.rmr ||
  //   !currentUser?.age ||
  //   !currentUser?.gender ||
  //   !currentUser?.weight
  // )
  //   return redirect('/');

  const favorites = await getFavorites(currentUser?.id || '');

  const food = await db.food.findMany({
    where: {
      OR: [{ userId: currentUser?.id }, { isCreator: true }],
    },
    take: 10,
    include: {
      category: true,
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  const requiredNutrients = calculateNutrientRequirements(
    currentUser?.pal as number,
    currentUser?.rmr as number,
    currentUser?.age as number,
    currentUser?.gender as Gender,
    currentUser?.weight as number
  );

  return (
    <div className='-mx-8'>
      <CompareHeader />

      <SplitScreen
        favorites={favorites.map((favorite) => favorite.food)}
        requiredNutrients={requiredNutrients}
        foodData={food}
      />
    </div>
  );
};

export default ComparePage;
