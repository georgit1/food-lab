import { db } from '@/lib/db';
import { MainNutrient } from '@prisma/client';

type GetFood = {
  userId: string | undefined;
  title?: string;
  categoryId?: string;
};

// TODO - add condition that food item has nutrients
interface WhereProps {
  title: { contains: string | undefined };
  categoryId: string | undefined;
  // mainNutrients: MainNutrient;
  isCreator: boolean;
  userId?: string;
}

// export const getFood = async ({ userId, title, categoryId }: GetFood) => {
//   try {
//     const food = await db.food.findMany({
//       where: {
//         OR: [
//           {
//             userId,
//             title: {
//               contains: title,
//             },
//             categoryId,
//           },
//           {
//             title: {
//               contains: title,
//             },
//             categoryId,
//             isCreator: true,
//           },
//         ],
//       },
//       include: {
//         category: true,
//         mainNutrients: true,
//         favourites: true,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return food;
//   } catch (error) {
//     console.log('[GET_FOOD', error);
//     return [];
//   }
// };
export const getFood = async ({ userId, title, categoryId }: GetFood) => {
  // try {
  // const whereCondition: WhereProps = {
  //   title: {
  //     contains: title,
  //   },
  //   categoryId,
  //   isCreator: true,
  // };

  try {
    const whereCondition: WhereProps = {
      title: {
        contains: title,
      },
      categoryId,
      // TODO
      OR: [
        {
          isCreator: true,
        },
        {
          userId,
        },
      ],
    };

    // if (userId) {
    //   whereCondition.userId = userId;
    // }

    const food = await db.food.findMany({
      // where: {
      //   OR: [whereCondition],
      // },
      where: whereCondition,
      include: {
        category: true,
        mainNutrients: true,
        favourites: true,
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
