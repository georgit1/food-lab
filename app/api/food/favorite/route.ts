import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { foodId } = await req.json();

    console.log(currentUser?.email, foodId);

    const existingFood = await db.food.findUnique({
      where: {
        id: foodId,
      },
    });

    if (!existingFood) {
      return new NextResponse('Invalid ID', { status: 404 });
    }

    const newFavorite = await db.favorite.create({
      data: {
        userId: currentUser?.id,
        foodId: foodId,
      },
    });

    return NextResponse.json(newFavorite);
  } catch (error) {
    console.log('[FAVORITE_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { foodId } = body;

    const existingFood = await db.food.findUnique({
      where: {
        id: foodId,
      },
    });

    if (!existingFood) {
      return new NextResponse('Invalid ID', { status: 404 });
    }

    await db.favorite.deleteMany({
      where: {
        userId: currentUser?.id,
        foodId: foodId,
      },
    });

    return new NextResponse('Favorite deleted successfully');
  } catch (error) {
    console.log('[FAVORITE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
