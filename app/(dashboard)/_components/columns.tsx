'use client';

import { Food } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Food>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: '',
    header: 'Category',
  },
];
