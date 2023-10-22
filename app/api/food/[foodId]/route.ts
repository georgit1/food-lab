import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import { seperateNutrientData } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { foodId } = params;
    const values = await req.json();

    const {
      food: foodData,
      mainNutrients: mainNutrientsData,
      minerals: mineralsData,
      traceElements: traceElementsData,
      vitamins: vitaminsData,
    } = seperateNutrientData(values);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const food = await db.food.update({
      where: {
        id: foodId,
        userId: currentUser.id,
      },
      // TODO - right type for preferences
      data: {
        ...foodData,
        // preferences: ['vegan'],
      },
    });

    const mainNutrient = await db.mainNutrient.upsert({
      where: { id: foodId },
      create: {
        ...mainNutrientsData,
        id: foodId,
        food: { connect: { id: foodId } },
      },
      update: mainNutrientsData,
    });

    const mineral = await db.mineral.upsert({
      where: { id: foodId },
      create: {
        ...mineralsData,
        id: foodId,
        food: { connect: { id: foodId } },
      },
      update: mineralsData,
    });

    const traceElement = await db.traceElement.upsert({
      where: { id: foodId },
      create: {
        ...traceElementsData,
        id: foodId,
        food: { connect: { id: foodId } },
      },
      update: traceElementsData,
    });

    const vitamin = await db.vitamin.upsert({
      where: { id: foodId },
      create: {
        ...vitaminsData,
        id: foodId,
        food: { connect: { id: foodId } },
      },
      update: vitaminsData,
    });

    return NextResponse.json({ status: 200, message: 'Successfully updated' });
  } catch (error) {
    console.log('[FOOD_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
