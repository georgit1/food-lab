'use client';

import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'w-max cursor-pointer bg-primary-100 rounded-full flex justify-center items-center transition duration-300',
  {
    variants: {
      size: {
        default: 'p-1.5',
        sm: 'p-1.5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const iconVariants = cva('text-primary-600 hover:scale-110 transition', {
  variants: {
    size: {
      default: 'h-5 w-5',
      sm: 'h-4 w-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface FavoriteButtonProps
  extends BackgroundVariantsProps,
    IconVariantsProps {
  foodId: string;
  favoriteIds: string[];
  className?: string;
}

// TODO favoriteIds inside this comp.
const FavoriteButton = ({
  foodId,
  favoriteIds,
  size,
  className,
}: FavoriteButtonProps) => {
  const router = useRouter();

  const isFavorite = useMemo(() => {
    return favoriteIds.includes(foodId);
  }, [foodId, favoriteIds]);

  const toggleFavorites = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      try {
        if (isFavorite) {
          await axios.delete('/api/food/favorite', { data: { foodId } });
          router.refresh();
          toast.success('removed');
        } else {
          await axios.post('/api/food/favorite', { foodId });
          router.refresh();
          toast.success('added');
        }
      } catch {
        toast.error('Something went wrong');
      }
    },
    [foodId, isFavorite, router]
  );

  return (
    <div
      onClick={(e) => toggleFavorites(e)}
      // className='cursor-pointer bg-primary-100 rounded-full flex justify-center items-center p-1.5 transition duration-300'
      className={cn(backgroundVariants({ size, className }))}
    >
      <Heart
        // className='text-primary-600 hover:scale-110 transition'
        className={cn(iconVariants({ size }))}
        fill={isFavorite ? '#0284c7' : 'transparent'}
        // size={20}
      />
    </div>
  );
};

export default FavoriteButton;
