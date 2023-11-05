'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Edit, Lock, MoreVertical, Trash, User } from 'lucide-react';
import Carousel from './Carousel';

import { isAdmin } from '@/lib/admin';
import { ModalType, useModal } from '@/hooks/useModalStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconBadge } from '@/components/IconBadge';

interface GeneralItemProps {
  foodId: string;
  userId: string;
  foodCreator: string;
  title: string;
  category: string;
  imageUrl: string;
  preferences: string[];
  isCreator: boolean;
}

const GeneralItem = ({
  foodId,
  userId,
  foodCreator,
  title,
  category,
  imageUrl,
  preferences,
  isCreator,
}: GeneralItemProps) => {
  const currentUser = useSession().data?.user;
  const { onOpen } = useModal();
  const router = useRouter();

  const onClick = () => {
    router.push(`/manage/${foodId}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { title, foodId });
  };

  return (
    <div className='relative col-span-2 sm:col-span-1 order-1 bg-primary-50 rounded-md p-2 overflow-hidden'>
      {/* <div className='flex justify-between p-2'> */}
      <div className='flex flex-col'>
        <span className='flex gap-1.5 items-center'>
          <h3 className='text-xl text-primary-600 font-bold truncate'>
            {title}
          </h3>
          {!isCreator && currentUser?.email && (
            <IconBadge icon={User} size={'sm'} />
          )}
        </span>
        <span className='text-md text-neutral-400'>{category}</span>
      </div>

      {/* Menu Button */}
      {isAdmin(currentUser?.email) || userId === foodCreator ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='absolute top-2 right-1 p-1 rounded-full bg-primary-50 hover:bg-primary-100 transition'>
              <MoreVertical
                size={20}
                className='text-primary-600 cursor-pointer hover'
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side='left'>
            <DropdownMenuItem
              onClick={onClick}
              className='cursor-pointer text-primary-800'
            >
              <Edit className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => onAction(e, 'deleteFood')}
              className='cursor-pointer text-red-600'
            >
              <Trash className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Lock
          className='absolute top-3 right-2 text-neutral-400 bg-primary-50'
          size={18}
        />
      )}
      {/* </div> */}
      <div className='relative h-40 w-full mt-8'>
        <Carousel imageUrl={imageUrl} preferences={preferences} />
      </div>
    </div>
  );
};

export default GeneralItem;
