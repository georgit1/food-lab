import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import AddEditForm from './_components/AddEditForm';
import getCurrentUser from '@/lib/getCurrentUser';

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
  });

  if (!food) {
    return redirect('/');
  }

  console.log(food);

  return (
    <div>
      <AddEditForm
        initialData={food}
        foodId={food.id}
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </div>
  );
};

export default AddEditFoodPage;
