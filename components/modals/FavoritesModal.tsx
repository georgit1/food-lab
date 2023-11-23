'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/useModalStore';
import FavoritesTable from '../FavoritesTable';

const FavoritesModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'favorites';
  const { favorites } = data;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-primary-800'>Favorites</DialogTitle>
          <DialogDescription className='text-neutral-500'>
            Browse your favorite foods
          </DialogDescription>
        </DialogHeader>
        {favorites && (
          <FavoritesTable favorites={favorites} onClose={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FavoritesModal;
