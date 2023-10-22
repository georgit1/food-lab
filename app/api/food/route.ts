import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { title, categoryId } = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
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
    console.log('[FOOD]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
