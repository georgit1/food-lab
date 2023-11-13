import { AlertTriangle } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AttentionProps {
  missingItem: string;
}

const Attention = ({ missingItem }: AttentionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <AlertTriangle size={15} className='text-[#B90000] cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent side='top' className='w-full'>
        <p className='text-xs font-semibold px-1'>{`${missingItem} is missing in at least one item`}</p>
      </PopoverContent>
    </Popover>
  );
};

export default Attention;
