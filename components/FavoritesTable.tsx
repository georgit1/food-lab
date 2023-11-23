import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Category, Food } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ScrollArea } from './ui/scroll-area';
import FavoriteButton from './FavoriteButton';
import StackedTextWithImage from './StackedTextWithImage';
import { WholeFoodWithCategory } from '@/types/types';

interface FoodTableProps {
  favorites: WholeFoodWithCategory[];
  onClose: () => void;
}

const FavoritesTable = ({ favorites, onClose }: FoodTableProps) => {
  const [sortOrder, setSortOrder] = useState('asc');

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
                  <ArrowUpDown size={16} />
                </button>
              </TableHead>
              <TableHead className='w-0 sm:w-full'>
                <span className='hidden sm:block'>Preference</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFavorites.map((favorite) => (
              <TableRow key={favorite.id}>
                <Link href={`/details/${favorite.id}`} onClick={onClose}>
                  <StackedTextWithImage
                    isCreator={favorite.isCreator}
                    imageSrc={favorite.imageUrl || ''}
                    title={favorite.title}
                    subtext={favorite.category.name}
                  />
                </Link>

                <TableCell>
                  {favorite.preference ? (
                    <span className='whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full'>
                      {favorite.preference}
                    </span>
                  ) : null}
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
        <div className='h-[200px] text-neutral-400 text-center text-sm text-muted-foreground mt-6'>
          {/* <img src='/burger.jpg' height={20} width={20} /> */}
          <Image
            src='/burger.jpg'
            height={150}
            width={150}
            alt='Illustration'
            className='mx-auto'
          />
          <span>Favorites are empty</span>
        </div>
      )}
    </ScrollArea>
  );
};

export default FavoritesTable;
