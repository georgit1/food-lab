import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const data = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const foodData = {
      ...data,
      userId: currentUser.id,
    };

    const food = await db.food.create({
      data: foodData,
    });

    // #######################

    // const food = await db.food.create({
    //   ...data,
    //   userId,
    // });

    return NextResponse.json(food);
  } catch (error) {
    console.log('[COURSES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
