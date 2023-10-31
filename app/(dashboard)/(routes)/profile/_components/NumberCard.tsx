import { LucideIcon } from 'lucide-react';
import { type } from 'os';

type Variant = 'primary' | 'secondary';

interface NumberCardProps {
  title: string;
  value: number;
  unit: string;
  icon?: LucideIcon;
  variant?: Variant;
}

const NumberCard = ({
  title,
  value,
  unit,
  icon: Icon,
  variant = 'secondary',
}: NumberCardProps) => {
  return (
    <div className='flex flex-col text-center font-semibold bg-primary-100 p-2 rounded-sm w-20 sm:w-32 md:w-24 xl:w-32'>
      <span
        className={`text-lg md:text-xl ${
          variant === 'secondary' ? 'text-primary-400' : 'text-primary-700'
        }`}
      >
        {title}
      </span>
      <span className='md:text-lg text-primary-600'>{value}</span>
      <span className='text-xs flex justify-center items-center gap-1 md:text-md text-primary-400'>
        {Icon && <Icon size={12} />} {unit}
      </span>
    </div>
  );
};

export default NumberCard;
