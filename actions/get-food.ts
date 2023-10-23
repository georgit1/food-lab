import { db } from '@/lib/db';

type GetFood = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getFood = async ({ userId, title, categoryId }: GetFood) => {
  try {
    const food = await db.food.findMany({
      where: {
        OR: [
          {
            userId,
            title: {
              contains: title,
            },
            categoryId,
          },
          {
            title: {
              contains: title,
            },
            categoryId,
            isCreator: true,
          },
        ],
      },
      include: {
        category: true,
        mainNutrients: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return food;
  } catch (error) {
    console.log('[GET_FOOD', error);
    return [];
  }
};
