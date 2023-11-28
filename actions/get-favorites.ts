import { db } from '../lib/db';

export const getFavorites = async (userId: string) => {
  try {
    const favorites = await db.favorite.findMany({
      where: {
        userId: userId,
      },
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
    });

    return favorites;
  } catch (error) {
    console.log('[GET_FAVORITES]', error);
    return [];
  }
};
