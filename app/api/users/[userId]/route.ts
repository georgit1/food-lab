import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import getCurrentUser from "@/utils/getCurrentUser";

export async function PATCH(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const values = await req.json();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    console.log("[USER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
