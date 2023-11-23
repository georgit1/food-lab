'use client';

import { cn } from '@/utils/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  variant?: 'default' | 'ghost';
  className?: string;
  onLogout?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  variant = 'default',
  className,
  onLogout,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleRoute = () => {
    router.push(href || '');
  };

  return (
    <button
      onClick={onLogout ? onLogout : handleRoute}
      type='button'
      className={cn(
        `w-full flex items-center gap-x-2 mb-1 text-slate-500 text-sm font-[500] pl-6 transition-all rounded-md ${
          variant === 'default'
            ? 'hover:text-slate-600 hover:bg-slate-300/20'
            : ''
        } ${className}`,
        isActive &&
          variant === 'default' &&
          'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700'
      )}
    >
      <div className='flex items-center gap-x-2 py-4'>
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-sky-700')}
        />
        {label}
      </div>
    </button>
  );
};
