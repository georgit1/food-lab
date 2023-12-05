import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';
import { WholeFoodWithCategory } from '@/types/types';

type WholeFoodWithCategoryWithQuantity = WholeFoodWithCategory & {
  quantity: number;
};

export async function PATCH(
  req: Request,
  { params }: { params: { mealId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { mealId } = params;
    const { mealItems, ...values } = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // only update imageUrl
    if (!mealItems) {
      const meal = await db.meal.update({
        where: {
          id: mealId,
          userId: currentUser.id,
        },
        data: {
          ...values,
        },
      });

      return NextResponse.json({
        status: 200,
        message: 'Successfully updated',
      });
    }

    const existingMealFoods = await db.mealFood.findMany({
      where: {
        mealId: mealId,
      },
    });

    // Extract the IDs of existing mealFoods to delete
    const mealFoodIdsToDelete = existingMealFoods.map(
      (mealFood) => mealFood.id
    );

    // Delete the existing mealFoods
    await db.mealFood.deleteMany({
      where: {
        id: {
          in: mealFoodIdsToDelete,
        },
      },
    });

    // Create the new mealFoods
    const meal = await db.meal.update({
      where: {
        id: mealId,
        userId: currentUser.id,
      },
      data: {
        ...values,
        mealFoods: {
          create: mealItems.map((item: WholeFoodWithCategoryWithQuantity) => ({
            quantity: item.quantity || 100,
            foodId: item.id,
          })),
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

    return NextResponse.json({ status: 200, message: 'Successfully updated' });
  } catch (error) {
    console.log('[MEAL_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { mealId: string } }
) {
  try {
    const { mealId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const deletedMeal = await db.meal.delete({
      where: {
        id: mealId,
      },
    });

    return NextResponse.json(deletedMeal);
  } catch (error) {
    console.log('[MEAL_ID_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
