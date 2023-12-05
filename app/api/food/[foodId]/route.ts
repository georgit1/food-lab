import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";
import { seperateNutrientData } from "@/utils/convertUtils";

export async function PATCH(
  req: Request,
  { params }: { params: { foodId: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    const { foodId } = params;
    const values = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // only update imageUrl
    if (Object.keys(values).length === 1 && "imageUrl" in values) {
      const food = await db.food.update({
        where: {
          id: foodId,
          userId: currentUser.id,
        },
        data: {
          ...values,
        },
      });

      return NextResponse.json(food);
    }

    const {
      food: foodData,
      mainNutrients: mainNutrientsData,
      minerals: mineralsData,
      traceElements: traceElementsData,
      vitamins: vitaminsData,
    } = seperateNutrientData(values);

    const food = await db.food.update({
      where: {
        id: foodId,
        userId: currentUser.id,
      },
      data: {
        ...foodData,
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

    return NextResponse.json({ status: 200, message: "Successfully updated" });
  } catch (error) {
    console.log("[FOOD_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { foodId: string } },
) {
  try {
    const currentUser = await getCurrentUser();
    const { foodId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const food = await db.food.findUnique({
      where: {
        id: foodId,
      },
    });

    if (!food) {
      return new NextResponse("Food item not found", { status: 404 });
    }

    if (food.userId !== currentUser.id) {
      return new NextResponse("Permission denied", { status: 403 });
    }

    const deletedFood = await db.food.delete({
      where: {
        id: foodId,
      },
    });

    return NextResponse.json(deletedFood);
  } catch (error) {
    console.log("[FOOD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
