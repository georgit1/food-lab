'use client';

import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AccordionButtonProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

const AccordionButton = ({ href, label, icon: Icon }: AccordionButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Button
      size='sm'
      onClick={() => router.push(href)}
      className={cn(
        'w-full justify-start mb-0.5 text-sm font-[500] pl-10',
        pathname === `${href}` && 'bg-sky-500/10 text-sky-700'
      )}
      variant='ghost'
    >
      <Icon
        size={18}
        className={cn('text-slate-500 mr-2', isActive && 'text-sky-700')}
      />
      {label}
    </Button>
  );
};

export default AccordionButton;
