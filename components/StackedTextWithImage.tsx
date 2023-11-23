import React from 'react';
import { ImageIcon, User } from 'lucide-react';

import { cn } from '@/utils/utils';
import IconBadge from './IconBadge';
import { Avatar, AvatarImage } from './ui/avatar';

interface StackedTextWithImageProps {
  imageSrc: string;
  title: string;
  subtext: string;
  isCreator?: boolean;
  isMeal?: boolean;
  variant?: 'default' | 'disabled';
}

const StackedTextWithImage = ({
  imageSrc,
  title,
  subtext,
  isCreator = true,
  isMeal = false,
  variant,
}: StackedTextWithImageProps) => {
  let ringColorClass = '';

  // necessary because the class names from tailwind are generated during the build process
  // and cannot be dynamically generated at runtime.

  switch (subtext) {
    case 'Grains':
      ringColorClass = 'ring-category-grains';
      break;
    case 'Vegetables':
      ringColorClass = 'ring-category-vegetables';
      break;
    case 'Legumes':
      ringColorClass = 'ring-category-legumes';
      break;
    case 'Nuts & Seeds':
      ringColorClass = 'ring-category-nuts_seeds';
      break;
    case 'Oils & Fats':
      ringColorClass = 'ring-category-oils_fats';
      break;
    case 'Herbs':
      ringColorClass = 'ring-category-herbs';
      break;
    case 'Beverages':
      ringColorClass = 'ring-category-beverages';
      break;
    case 'Dairy':
      ringColorClass = 'ring-category-dairy';
      break;
    case 'Fruits':
      ringColorClass = 'ring-category-fruits';
      break;
    default:
      break;
  }

  const ringColor = ringColorClass || 'ring-primary-600';

  const ringByVariant = {
    default: `${!isMeal ? ringColor : 'ring-neutral-800'}`,
    disabled: 'ring-neutral-400',
  };

  const opacityByVariant = {
    default: 'opacity-100',
    disabled: 'opacity-60',
  };

  const textByVariant = {
    default: `${!isMeal ? 'text-primary-800' : 'text-neutral-800'}`,
    disabled: 'text-neutral-500',
  };

  const subtextByVariant = {
    default: `${!isMeal ? 'text-primary-500' : 'text-neutral-600'}`,
    disabled: 'text-neutral-400',
  };

  return (
    <div className='max-w-[200px] flex items-center'>
      <div className='mr-1.5'>
        <Avatar
          className={cn(
            'flex items-center justify-center w-11 h-11 ring-2 ring-offset-2 m-3',
            ringByVariant[variant || 'default']
          )}
        >
          {imageSrc ? (
            <AvatarImage
              src={imageSrc}
              className={cn(opacityByVariant[variant || 'default'])}
            />
          ) : (
            <ImageIcon className='text-neutral-400' />
          )}
        </Avatar>
      </div>
      <div className='truncate'>
        <h2
          className={cn(
            'flex items-center text-md font-semibold gap-1',
            textByVariant[variant || 'default']
          )}
        >
          <span className='truncate'>{title}</span>
          {!isCreator && <IconBadge icon={User} size='xs' />}
          {isMeal && (
            <span className='text-xs text-neutral-700 px-2 rounded-full bg-yellow-300'>
              Meal
            </span>
          )}
        </h2>
        <p
          className={cn(
            'text-xs truncate',
            subtextByVariant[variant || 'default']
          )}
        >
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default StackedTextWithImage;
