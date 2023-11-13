'use client';

import { useState } from 'react';
import { Category, Food } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUpDown, Plus } from 'lucide-react';
import StackedTextWithImage from '@/components/StackedTextWithImage';
import ToggleFoodButton from './ToggleFoodButton';

type FoodWithCategory = Food & { category: Category };

interface FoodItemsTabProps {
  foodData: FoodWithCategory[];
}

const FoodItemsTab = ({ foodData }: FoodItemsTabProps) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // sort favorites based on the current sort order
  const sortedFoodData = foodData.slice().sort((a, b) => {
    const comparison =
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  return (
    <ScrollArea className='min-h-[300px]'>
      {sortedFoodData.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='flex items-center'>
                <span className='mr-2 truncate'>Title</span>
                <button onClick={toggleSortOrder}>
                  <ArrowUpDown size={15} />
                </button>
              </TableHead>
              <TableHead className='w-0 sm:w-max'>
                <span className='hidden sm:block'>Attributes</span>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFoodData.map((item) => (
              <TableRow key={item.id}>
                {/* <Link href={`/details/${item.id}`} onClick={onClose}> */}
                <StackedTextWithImage
                  isCreator={item.isCreator}
                  imageSrc={item.imageUrl || ''}
                  title={item.title}
                  subtext={item.category.name}
                />
                {/* </Link> */}

                <TableCell>
                  {item.preference ? (
                    <span className='whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full'>
                      {item.preference}
                    </span>
                  ) : null}
                </TableCell>
                <TableCell>
                  <ToggleFoodButton foodData={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {sortedFoodData.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-6'>
          No Food available
        </div>
      )}
    </ScrollArea>
  );
};

export default FoodItemsTab;
