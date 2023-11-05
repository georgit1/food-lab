'use client';

import { User } from '@prisma/client';
import { Bike, CircleSlash2, Equal, X } from 'lucide-react';

import NumberCard from './NumberCard';
import BiometricDisplay from './BiometricDisplay';
import { Separator } from '@/components/ui/separator';
import { ModalType, useModal } from '@/hooks/useModalStore';

interface DataInsightProps {
  userData: User;
}

const DataInsight = ({ userData }: DataInsightProps) => {
  const { onOpen } = useModal();

  let amr = 0;
  if (userData.rmr && userData.pal) {
    amr = userData?.rmr * userData?.pal;
  }

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { userData });
  };

  return (
    <div className='flex flex-col gap-8 bg-primary-50 rounded-md p-6 lg:pt-24 xl:p-20'>
      {/* Equation */}
      <div className='flex items-center justify-center gap-1 sm:gap-3 lg:gap-1 xl:gap-3'>
        <NumberCard
          title='RMR'
          value={parseFloat(userData?.rmr?.toFixed(1) || '0')}
          unit='kcal'
        />
        <X className='text-primary-400' />
        <NumberCard
          title='PAL'
          value={parseFloat(userData?.pal?.toFixed(2) || '0')}
          unit='PAL'
          icon={CircleSlash2}
        />
        <Equal className='text-primary-400' />
        <NumberCard
          title='AMR'
          value={parseFloat(amr.toFixed(1))}
          unit='kcal'
          variant='primary'
        />
      </div>

      {/* Personal data */}
      <div className='flex justify-center items-center gap-6'>
        <BiometricDisplay value={userData.gender || '-'} label='Gender' />
        <Separator orientation='vertical' className='w-[2px]' />
        <BiometricDisplay value={userData.age || '-'} label='Age' />
        <Separator orientation='vertical' className='w-[2px]' />
        <BiometricDisplay value={userData.height || '-'} label='cm' />
        <Separator orientation='vertical' className='w-[2px]' />
        <BiometricDisplay value={userData.weight || '-'} label='kg' />
      </div>

      {/* CTA-Button w/ dialog */}
      <div
        className='flex flex-col gap-2 bg-primary-700 rounded-md py-3 px-6 mx-auto lg:mt-8 text-neutral-50 hover:bg-primary-800 cursor-pointer transition'
        onClick={(e) => onAction(e, 'calculateCalories')}
      >
        <Bike className='mx-auto' size={22} />
        <span className='text-center text-xs'>
          Calculate calorie
          <br />
          needs
        </span>
      </div>
    </div>
  );
};

export default DataInsight;
