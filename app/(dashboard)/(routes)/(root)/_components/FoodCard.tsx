import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon, User } from 'lucide-react';

import getCurrentUser from '@/utils/getCurrentUser';
import { getFavorites } from '@/actions/get-favorites';
import FavoriteButton from '@/components/FavoriteButton';
import IconBadge from '@/components/IconBadge';

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
  isCreator,
}: FoodCardProps) => {
  const isImage = Boolean(imageUrl);
  const currentUser = await getCurrentUser();
  const favorites = await getFavorites(currentUser?.id || '');

  let backgroundColorClass = '';
  let borderColorClass = '';

  // necessary because the class names from tailwind are generated during the build process
  // and cannot be dynamically generated at runtime.

  switch (category) {
    case 'Grains':
      backgroundColorClass = 'bg-category-grains';
      borderColorClass = 'border-category-grains';
      break;
    case 'Vegetables':
      backgroundColorClass = 'bg-category-vegetables';
      borderColorClass = 'border-category-vegetables';
      break;
    case 'Legumes':
      backgroundColorClass = 'bg-category-legumes';
      borderColorClass = 'border-category-legumes';
      break;
    case 'Nuts & Seeds':
      backgroundColorClass = 'bg-category-nuts_seeds';
      borderColorClass = 'border-category-nuts_seeds';
      break;
    case 'Oils & Fats':
      backgroundColorClass = 'bg-category-oils_fats';
      borderColorClass = 'border-category-oils_fats';
      break;
    case 'Herbs':
      backgroundColorClass = 'bg-category-herbs';
      borderColorClass = 'border-category-herbs';
      break;
    case 'Beverages':
      backgroundColorClass = 'bg-category-beverages';
      borderColorClass = 'border-category-beverages';
      break;
    case 'Dairy':
      backgroundColorClass = 'bg-category-dairy';
      borderColorClass = 'border-category-dairy';
      break;
    case 'Fruits':
      backgroundColorClass = 'bg-category-fruits';
      borderColorClass = 'border-category-fruits';
      break;
    default:
      break;
  }

  return (
    <Link href={`/details/${id}`}>
      <div
        className={`flex flex-col gap-4 border-b-2 ${borderColorClass} bg-primary-50 rounded-xl p-4 shadow-md relative overflow-hidden`}
      >
        <div
          className={`absolute h-10 w-32 ${backgroundColorClass} -right-3 -top-6 rotate-12`}
        ></div>
        {currentUser?.id && (
          <div className='absolute top-[5px] right-[5px]'>
            <FavoriteButton
              foodId={id}
              favoriteIds={favorites.map((favorite) => favorite.foodId)}
            />
          </div>
        )}
        {!isCreator && (
          <IconBadge icon={User} size='sm' className='absolute top-1 left-1' />
        )}
        <div className='mx-auto max-w-[210px] flex items-center justify-center gap-4'>
          {/* Image */}
          <div
            className={`flex flex-shrink-0 items-center justify-center h-[95px] w-[95px] border-[3.5px] ${borderColorClass} rounded-full overflow-hidden`}
          >
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
          <div className='flex flex-col text-slate-900 truncate'>
            <span className='text-lg font-bold truncate'>{title}</span>
            <span
              className={`w-max border-[2px] ${borderColorClass} rounded-full px-2 text-xs font-medium`}
            >
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
