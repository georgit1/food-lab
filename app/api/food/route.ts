import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { title, categoryId } = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const food = await db.food.create({
      data: {
        userId: currentUser?.id,
        title,
        categoryId,
      },
    });

    return NextResponse.json(food);
  } catch (error) {
    console.log("[FOOD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Get food by seachTerm
export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const url = new URL(req.url);
    const searchTerm = url.searchParams.get("searchTerm");

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const food = await db.food.findMany({
      where: {
        AND: [
          {
            OR: [{ userId: currentUser.id }, { isCreator: true }],
          },
          { title: { contains: searchTerm as string } },
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

    return NextResponse.json(food);
  } catch (error) {
    console.log("[FOOD]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
