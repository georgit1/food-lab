import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import AddEditForm from '../_components/AddEditForm';

const EditFoodPage = async ({ params }: { params: { foodId: string } }) => {
  const { foodId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const food = await db.food.findUnique({
    where: {
      id: foodId,
      userId,
    },
  });

  if (!food) {
    return redirect('/');
  }

  return (
    <div>
      EditForm
      {/* <AddEditForm initialFood={food} foodId={food.id} /> */}
    </div>
  );
};

export default EditFoodPage;
