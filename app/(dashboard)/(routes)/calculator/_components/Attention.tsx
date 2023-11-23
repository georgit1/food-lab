import { AlertTriangle } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { title } from 'process';

interface AttentionProps {
  title: string;
  missingItems: string[];
}

const Attention = ({ title, missingItems }: AttentionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <AlertTriangle size={15} className='text-[#B90000] cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent side='top' className='max-w-md'>
        <p className='text-xs font-semibold px-1'>{`${title} is missing in ${missingItems?.join(
          ', '
        )}`}</p>
      </PopoverContent>
    </Popover>
  );
};

export default Attention;
