import { db } from "@/lib/db";

type GetFood = {
  userId: string | undefined;
  title?: string;
  categoryId?: string;
};

export const getFood = async ({ userId, title, categoryId }: GetFood) => {
  try {
    const food = await db.food.findMany({
      where: {
        title: {
          contains: title,
        },
        categoryId,
        mainNutrients: {
          some: {
            calories: {
              gt: 0,
            },
          },
        },
        OR: [
          {
            isCreator: true,
          },
          {
            userId,
          },
        ],
      },

      include: {
        category: true,
        mainNutrients: true,
        favourites: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    return food;
  } catch (error) {
    console.log("[GET_FOOD", error);
    return [];
  }
};
