import React from 'react';
import { LucideIcon } from 'lucide-react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundVariants = cva(
  'rounded-full flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-sky-100',
        success: 'bg-emerald-100',
      },
      size: {
        default: 'p-2',
        md: 'p-1.5',
        sm: 'p-1',
        xs: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'h-7 w-7',
      md: 'h-6 w-6',
      sm: 'h-5 w-5',
      xs: 'h-3 w-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const titleVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'text-xl',
      md: 'text-lg',
      sm: 'text-md',
      xs: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconHeaderProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}

const IconHeader = ({
  icon: Icon,
  title,
  variant,
  size,
  className,
}: IconHeaderProps) => {
  return (
    <div className='flex items-center gap-x-2'>
      {/* icon */}
      <div className={cn(backgroundVariants({ variant, size, className }))}>
        <Icon className={cn(iconVariants({ variant, size }))} />
      </div>

      {/* header */}
      <h2
        className={cn(
          'font-semibold',
          titleVariants({ variant, size, className })
        )}
      >
        {title}
      </h2>
    </div>
  );
};

export default IconHeader;
