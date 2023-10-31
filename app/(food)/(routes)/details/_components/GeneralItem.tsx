import { IconBadge } from '@/components/IconBadge';
import { User } from 'lucide-react';
import Image from 'next/image';
import Carousel from './Carousel';

interface GeneralItemProps {
  title: string;
  category: string;
  imageUrl: string;
  preferences: string[];
  isCreator: boolean;
}

const GeneralItem = ({
  title,
  category,
  imageUrl,
  preferences,
  isCreator,
}: GeneralItemProps) => {
  return (
    <div className='bg-primary-50 rounded-md overflow-hidden'>
      <div className='flex flex-col p-2'>
        <span className='flex gap-1.5'>
          <span className='text-xl text-primary-600 font-bold'>{title}</span>
          {!isCreator && <IconBadge icon={User} size={'sm'} />}
        </span>
        <span className='text-md text-neutral-400'>{category}</span>
      </div>
      <div className='relative h-40 w-full mt-8'>
        <Carousel imageUrl={imageUrl} preferences={preferences} />
      </div>
    </div>
  );
};

export default GeneralItem;
