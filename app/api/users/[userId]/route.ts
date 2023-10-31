import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/lib/getCurrentUser';

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const values = await req.json();
    console.log('##############', values);

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USER_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
