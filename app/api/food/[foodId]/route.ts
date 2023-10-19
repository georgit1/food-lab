import { db } from '@/lib/db';
import getCurrentUser from '@/lib/getCurrentUser';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { foodId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { foodId } = params;
    const values = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.food.update({
      where: {
        id: foodId,
        userId: currentUser.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log('[FOOD_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
