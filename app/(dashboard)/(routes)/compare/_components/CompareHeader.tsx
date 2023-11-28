'use client';

import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { ModalType, useModal } from '@/hooks/useModalStore';
import { useSmallScreen } from '@/hooks/useSmallScreen';
import { SlidersHorizontal } from 'lucide-react';

const CompareHeader = () => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action);
  };

  return (
    <div className='flex items-center justify-between mx-8'>
      <PageHeader
        header='Compare two groceries'
        subtext='compare and get full overview of their differences'
      />
      {isSmallScreen ? (
        <Button
          className='fixed bottom-6 right-6 p-4 h-auto shadow-md rounded-full z-50'
          onClick={(e) => onAction(e, 'adjustWeight')}
        >
          <SlidersHorizontal className='h-5 w-5' />
        </Button>
      ) : (
        <Button
          className='p-2.5 lg:rounded-md'
          onClick={(e) => onAction(e, 'adjustWeight')}
        >
          <SlidersHorizontal className='h-5 w-5' />
        </Button>
      )}
    </div>
  );
};

export default CompareHeader;
