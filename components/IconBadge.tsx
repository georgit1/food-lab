import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

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
      default: 'h-8 w-8',
      md: 'h-6 w-6',
      sm: 'h-4 w-4',
      xs: 'h-3 w-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
  className?: string;
}

const IconBadge = ({
  icon: Icon,
  variant,
  size,
  className,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size, className }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  );
};

export default IconBadge;
