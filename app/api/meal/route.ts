import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import getCurrentUser from '@/utils/getCurrentUser';

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const { title } = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const meal = await db.meal.create({
      data: {
        userId: currentUser?.id,
        title,
      },
    });

    return NextResponse.json(meal);
  } catch (error) {
    console.log('[MEAL]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
