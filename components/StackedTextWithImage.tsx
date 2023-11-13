import React from 'react';
import { ImageIcon, User } from 'lucide-react';

import { Avatar, AvatarImage } from './ui/avatar';
import { IconBadge } from './IconBadge';
import { cn } from '@/lib/utils';

interface StackedTextWithImageProps {
  imageSrc: string;
  title: string;
  subtext: string;
  isCreator: boolean;
  variant?: 'default' | 'disabled';
}

const ringByVariant = {
  default: 'ring-primary-600',
  disabled: 'ring-neutral-400',
};

const opacityByVariant = {
  default: 'opacity-100',
  disabled: 'opacity-60',
};

const textByVariant = {
  default: 'text-primary-600',
  disabled: 'text-neutral-500',
};

const subtextByVariant = {
  default: 'text-primary-400',
  disabled: 'text-neutral-400',
};

const StackedTextWithImage = ({
  imageSrc,
  title,
  subtext,
  isCreator,
  variant,
}: StackedTextWithImageProps) => {
  return (
    <div className='flex items-center'>
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
      <div>
        <h2
          className={cn(
            'flex text-md font-semibold gap-1',
            textByVariant[variant || 'default']
          )}
        >
          {title}
          {!isCreator && <IconBadge icon={User} size='xs' />}
        </h2>
        <p className={cn('text-xs', subtextByVariant[variant || 'default'])}>
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default StackedTextWithImage;
