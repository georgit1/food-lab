'use client';

import { PlusCircle } from 'lucide-react';

import { WholeFoodWithCategory } from '@/types/types';
import { ModalType, useModal } from '@/hooks/useModalStore';
import { useSmallScreen } from '@/hooks/useSmallScreen';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';

interface CalculatorHeaderProps {
  foodData: WholeFoodWithCategory[];
}

const MealHeader = ({ foodData }: CalculatorHeaderProps) => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData }, 'meal');
  };

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
      <PageHeader
        header='Put together a meal'
        subtext='create a meal and analyze personalized nutrients'
      />
      <div>
        {isSmallScreen ? (
          <Button
            className='fixed bottom-6 right-6 p-4 h-auto shadow-md rounded-full z-50'
            onClick={(e) => onAction(e, 'chooseFood')}
          >
            <PlusCircle className='h-5 w-5' />
          </Button>
        ) : (
          <Button
            className='p-2.5 h-auto lg:rounded-md'
            onClick={(e) => onAction(e, 'chooseFood')}
          >
            <PlusCircle className='h-5 w-5' />
            <span className='ml-2'>Add Food</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MealHeader;
