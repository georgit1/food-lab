import React from 'react';
import { ImageIcon, User } from 'lucide-react';

import { Avatar, AvatarImage } from './ui/avatar';
import { IconBadge } from './IconBadge';

interface StackedTextWithImageProps {
  imageSrc: string;
  title: string;
  subtext: string;
  isCreator: boolean;
}

const StackedTextWithImage = ({
  imageSrc,
  title,
  subtext,
  isCreator,
}: StackedTextWithImageProps) => {
  return (
    <div className='flex items-center'>
      <div className='mr-1.5'>
        <Avatar className='flex items-center justify-center w-11 h-11 ring-2 ring-primary-600 ring-offset-2 m-3'>
          {imageSrc ? (
            <AvatarImage src={imageSrc} />
          ) : (
            <ImageIcon className='text-neutral-400' />
          )}
        </Avatar>
      </div>
      <div>
        <h2 className='flex text-md font-semibold text-primary-600 gap-1'>
          {title}
          {!isCreator && <IconBadge icon={User} size='xs' />}
        </h2>
        <p className='text-xs text-primary-400'>{subtext}</p>
      </div>
    </div>
  );
};

export default StackedTextWithImage;
