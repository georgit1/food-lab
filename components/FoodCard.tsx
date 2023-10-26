import { ImageIcon, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import getCurrentUser from '@/lib/getCurrentUser';
import { getFavorites } from '@/actions/get-favorites';
import { IconBadge } from './IconBadge';

interface FoodCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  category: string | undefined;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
  fiber: number;
  color: string;
  isCreator: boolean;
}

const FoodCard = async ({
  id,
  title,
  imageUrl,
  category,
  calories,
  proteins,
  carbohydrates,
  fats,
  fiber,
  color,
  isCreator,
}: FoodCardProps) => {
  // TODO - color
  const dynamicColor = `bg-${color}`;
  const isImage = Boolean(imageUrl);
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites(currentUser?.id || '');

  return (
    <Link href={`/details/${id}`} className=''>
      <div className='flex flex-col gap-4 border-b-2 border-primary-600 rounded-xl p-4 shadow-md bg-primary-50 relative overflow-hidden max-w-[340px]'>
        <div
          className={`absolute h-10 w-32 bg-primary-600 -right-3 -top-6 rotate-12`}
        ></div>
        <div className='absolute top-[5px] right-[5px]'>
          <FavoriteButton
            foodId={id}
            favoriteIds={favorites.map((favorite) => favorite.foodId)}
          />
        </div>
        {!isCreator && (
          <IconBadge icon={User} size='sm' className='absolute top-1 left-1' />
        )}
        <div className='flex items-center justify-center gap-4'>
          {/* Image */}
          <div className='flex items-center justify-center h-[95px] w-[95px] border-[3.5px] border-primary-600 rounded-full overflow-hidden'>
            {isImage && (
              <Image
                width={30}
                height={30}
                className='object-cover w-full h-full'
                alt={title}
                src={imageUrl || ''}
              />
            )}
            {!isImage && <ImageIcon className='text-neutral-400' size={30} />}
          </div>
          <div className='flex flex-col text-slate-900'>
            <span className='text-lg font-bold'>{title}</span>
            <span className='w-max border-[2px] border-primary-600 rounded-full px-2 text-xs font-medium'>
              {category}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className='flex justify-center gap-3 text-sm text-slate-600'>
          <div className='flex flex-col'>
            <span>Calories</span>
            <span>Proteins</span>
            <span>Carbohydrates</span>
            <span>Fats</span>
            <span>Fiber</span>
          </div>
          <div className='bg-slate-200 w-[3px]'></div>
          <div className='flex flex-col'>
            <span>{calories}</span>
            <span>{proteins}</span>
            <span>{carbohydrates}</span>
            <span>{fats}</span>
            <span>{fiber}</span>
          </div>
          <div className='bg-slate-200 w-[3px]'></div>
          <div className='flex flex-col'>
            <span>kcal</span>
            <span>g</span>
            <span>mg</span>
            <span>g</span>
            <span>g</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
