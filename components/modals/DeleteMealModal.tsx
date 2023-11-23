'use client';

import qs from 'query-string';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModalStore';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useCalculator } from '@/context/calculatorContext';
import Loader from '../Loader';

const DeleteMealModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { deleteMealEntry } = useCalculator();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'deleteMeal';
  const { mealId, title } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/meal/${mealId}`);
      deleteMealEntry(mealId || '');
      toast.success('Meal deleted');
      onClose();
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-primary-800 text-center font-bold'>
            Delete Meal
          </DialogTitle>
          <DialogDescription className='text-center text-neutral-500'>
            Are you sure you want to do this? <br />
            <span className='text-primary-600 font-semibold'>
              #{title}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} onClick={onClose} variant='ghost'>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} className='w-[85px]'>
              {isLoading ? <Loader /> : 'Confirm'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMealModal;
