import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import AddEditForm from './_components/AddEditForm';
import getCurrentUser from '@/utils/getCurrentUser';

// TODO - only admin can edit admin food
const AddEditFoodPage = async ({ params }: { params: { foodId: string } }) => {
  const currentUser = await getCurrentUser();
  const { foodId } = params;

  if (!currentUser?.id || !currentUser?.email) {
    return redirect('/');
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  const food = await db.food.findUnique({
    where: {
      id: foodId,
      userId: currentUser.id,
    },
    include: {
      mainNutrients: true,
      minerals: true,
      traceElements: true,
      vitamins: true,
    },
  });

  if (!food) {
    return redirect('/');
  }

  return (
    <AddEditForm
      initialData={food}
      foodId={food.id}
      options={categories.map((category) => ({
        label: category.name,
        value: category.id,
      }))}
    />
  );
};

export default AddEditFoodPage;
