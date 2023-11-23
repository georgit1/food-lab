import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';

interface MealCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  foodTitles: string[];
}

const MealCard = async ({ id, title, imageUrl, foodTitles }: MealCardProps) => {
  const isImage = Boolean(imageUrl);

  return (
    <Link href={`/meal/${id}`}>
      <div className='border-b-2 border-neutral-800 rounded-xl p-4 shadow-md bg-primary-50'>
        <div className='flex items-center justify-start gap-4'>
          <div className='flex items-center flex-shrink-0 justify-center h-[95px] w-[95px] border-[3.5px] border-neutral-800 rounded-full overflow-hidden'>
            {isImage && (
              <Image
                width={30}
                height={30}
                className='object-cover w-full h-full'
                alt={title}
                src={imageUrl || ''}
              />
            )}
            {!isImage && <ImageIcon className='text-neutral-400' size={30} />}
          </div>
          <div className='flex flex-col gap-0.5 text-slate-900 truncate'>
            <span className='text-lg font-bold truncate'>{title}</span>
            <span className='text-xs text-neutral-700 px-2 rounded-full max-w-fit bg-yellow-300'>
              Meal
            </span>
            <span className='text-xs truncate'>{foodTitles.join(', ')}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
