import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const foodData = {
      ...data,
      userId,
    };

    const food = await db.food.create({
      data: foodData,
    });

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
