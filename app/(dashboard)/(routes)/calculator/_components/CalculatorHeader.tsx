'use client';

import { PlusCircle } from 'lucide-react';

import { ModalType, useModal } from '@/hooks/useModalStore';
import { useSmallScreen } from '@/hooks/useSmallScreen';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { Category, Food } from '@prisma/client';

type FoodWithCategory = Food & {
  category: Category;
};

interface CalculatorHeaderProps {
  foodData: FoodWithCategory[];
}

const CalculatorHeader = ({ foodData }: CalculatorHeaderProps) => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData });
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
            className='fixed bottom-6 right-6 p-4 h-auto shadow-md rounded-full'
            onClick={(e) => onAction(e, 'chooseFood')}
          >
            <PlusCircle className='h-5 w-5' />
          </Button>
        ) : (
          <Button
            variant='outline'
            className='p-2.5 h-auto rounded-full md:static lg:rounded-md'
            onClick={(e) => onAction(e, 'chooseFood')}
          >
            <PlusCircle className='h-5 w-5' />
            <span className='hidden lg:inline-block ml-2'>Add Food</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default CalculatorHeader;
