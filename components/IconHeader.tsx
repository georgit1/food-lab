import React from 'react';
import { LucideIcon } from 'lucide-react';
import { IconBadge } from './IconBadge';
import { cn } from '@/lib/utils';

interface IconHeaderProps extends React.ComponentProps<typeof IconBadge> {
  title: string;
  icon: LucideIcon;
  classname?: string;
}

const IconHeader = ({ title, icon, classname, ...rest }: IconHeaderProps) => {
  return (
    <div className='flex items-center gap-x-2'>
      <IconBadge icon={icon} {...rest} />
      <h2 className={cn('text-xl text-primary-600 font-semibold', classname)}>
        {title}
      </h2>
    </div>
  );
};

export default IconHeader;
