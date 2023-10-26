'use client';

import { Category } from '@prisma/client';
import CategoryItem from './CategoryItem';

interface CategoriesProps {
  items: Category[];
}

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto'>
      {/* TODO - categoryitem for personal foods and "All" */}
      {/* <CategoryItem label='All' value='all' /> */}

      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} value={item.id} />
      ))}
    </div>
  );
};

export default Categories;
