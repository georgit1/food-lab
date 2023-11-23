'use client';

import { useModal } from '@/hooks/useModalStore';
import PalCalculator from '@/app/(dashboard)/(routes)/profile/_components/PalCalculator';
import PageHeader from '../PageHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const CalculateCaloriesModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'calculateCalories';
  const { userData } = data;

  // TODO - design
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-primary-800'>
            Calorie Calculator
          </DialogTitle>
          <DialogDescription className='text-neutral-500'>
            calculate RMR and PAL values
          </DialogDescription>
        </DialogHeader>

        <Separator />
        <ScrollArea className='max-h-[450px]'>
          <PalCalculator userData={userData!} onClose={onClose} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CalculateCaloriesModal;
