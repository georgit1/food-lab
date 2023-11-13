import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import { calculateNutrientRequirements } from '@/lib/calcPersonalNutrients';

import CalculatorGrid from './_components/CalculatorGrid';
import CalculatorHeader from './_components/CalculatorHeader';

const CalculatorPage = async () => {
  const currentUser = await getCurrentUser();

  if (
    !currentUser?.pal ||
    !currentUser?.rmr ||
    !currentUser?.age ||
    !currentUser?.gender ||
    !currentUser?.weight
  )
    return redirect('/');

  // const food = await db.food.findMany({
  //   where: {
  //     OR: [{ id: currentUser.id }, { isCreator: true }],
  //   },
  //   include: {
  //     category: true,
  //     mainNutrients: true,
  //     minerals: true,
  //     traceElements: true,
  //     vitamins: true,
  //   },
  // });

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

  if (!food) {
    return redirect('/');
  }

  // TODO - memoize
  const requiredNutrients = calculateNutrientRequirements(
    currentUser?.pal,
    currentUser?.rmr,
    currentUser?.age,
    currentUser?.gender,
    currentUser?.weight
  );

  return (
    <div>
      <CalculatorHeader foodData={food} />
      <CalculatorGrid foodData={food} requiredNutrients={requiredNutrients} />
    </div>
  );
};

export default CalculatorPage;
