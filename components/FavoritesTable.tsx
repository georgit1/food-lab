import { ArrowUpDown } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Category, Food } from '@prisma/client';

type FoodWithCategory = Food & { category: Category; preferences: string[] };

interface FoodTableProps {
  favorites: FoodWithCategory[];
}

import React, { useState } from 'react';
import StackedTextWithImage from './StackedTextWithImage';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DialogClose } from './ui/dialog';

const FavoritesTable = ({ favorites }: FoodTableProps) => {
  const [sortOrder, setSortOrder] = useState('asc');

  const router = useRouter();

  // toggle the sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // sort favorites based on the current sort order
  const sortedFavorites = favorites.slice().sort((a, b) => {
    const comparison =
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  return (
    <ScrollArea className='max-h-[300px]'>
      {sortedFavorites.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='flex items-center'>
                <span className='mr-2'>Title</span>
                <button onClick={toggleSortOrder}>
                  <ArrowUpDown size={20} />
                </button>
              </TableHead>
              <TableHead className='w-0 sm:w-full'>
                <span className='hidden sm:block'>Attributes</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFavorites.map((favorite) => (
              <TableRow
                key={favorite.id}
                // onClick={(e) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                //   router.push(`/details/${favorite.id}`);
                // }}
              >
                {/* TODO - close dialog onClick of row in e.g details page */}
                <Link href={`/details/${favorite.id}`}>
                  <StackedTextWithImage
                    isCreator={favorite.isCreator}
                    imageSrc={favorite.imageUrl || ''}
                    title={favorite.title}
                    subtext={favorite.category.name}
                  />
                </Link>

                <TableCell>
                  {favorite.preferences.map((preferenece) => (
                    <span
                      className='whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full'
                      key={preferenece}
                    >
                      {preferenece}
                    </span>
                  ))}
                </TableCell>
                <TableCell>
                  <FavoriteButton
                    favoriteIds={favorites.map((favorite) => favorite.id)}
                    foodId={favorite.id}
                    size='sm'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {sortedFavorites.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-6'>
          No Favorites
        </div>
      )}
    </ScrollArea>
  );
};

export default FavoritesTable;
