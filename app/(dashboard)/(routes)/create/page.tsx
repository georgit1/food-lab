import { db } from '@/lib/db';
import AddEditForm from './_components/AddEditForm';

const AddFoodPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div>
      <AddEditForm
        options={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      />
    </div>
  );
};

export default AddFoodPage;
