'use server';

import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';

export const getFoodBySearchTerm = async (
  searchTerm: string,
  userId: string
) => {
  try {
    // const currentUser = await getCurrentUser();
    const food = await db.food.findMany({
      where: {
        AND: [
          {
            // OR: [{ userId: currentUser?.id }, { isCreator: true }],
            OR: [{ userId }, { isCreator: true }],
          },
          { title: { contains: searchTerm } },
        ],
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
    return food;
  } catch (error) {
    console.log('[GET_FOOD_BY_SEARCHTERM', error);
    return [];
  }
};
