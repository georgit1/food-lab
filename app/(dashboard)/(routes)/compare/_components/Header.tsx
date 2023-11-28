import React from 'react';
import { Crown, ImageIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import IconBadge from '@/components/IconBadge';
import { useSmallScreen } from '@/hooks/useSmallScreen';

interface HeaderProps {
  imageSrc: string;
  title: string;
  category: string;
  variant?: 'left' | 'right';
  winner?: boolean;
}

const Header = ({
  imageSrc,
  title,
  category,
  variant,
  winner = false,
}: HeaderProps) => {
  const isSmallScreen = useSmallScreen();

  const sideByVariant = {
    left: 'flex items-center justify-center',
    right: 'flex flex-row-reverse justify-center items-center text-end',
  };

  return (
    <div className={cn('mt-2', sideByVariant[variant || 'left'])}>
      <div className='mr-1.5'>
        <Avatar
          className={`flex items-center justify-center ring-primary-800 ring-2 ring-offset-2 m-3 ${
            isSmallScreen ? 'w-12 h-12' : 'w-14 h-14'
          } `}
        >
          {imageSrc ? (
            <AvatarImage src={imageSrc} />
          ) : (
            <ImageIcon className='text-neutral-400' />
          )}
        </Avatar>
      </div>
      <div className='truncate'>
        <h2 className='flex items-center text-md text-primary-800 font-semibold gap-1'>
          <span className='truncate'>{title || '[Title]'}</span>
          {winner && <IconBadge variant={'success'} icon={Crown} size={'xs'} />}
        </h2>
        <p className='text-xs text-neutral-500 truncate'>
          {category || '[category]'}
        </p>
      </div>
    </div>
  );
};

export default Header;
