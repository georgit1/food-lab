import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ModalType, useModal } from '@/hooks/useModalStore';
import { Soup } from 'lucide-react';

const MealsTab = () => {
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action);
  };

  return (
    <ScrollArea className='min-h-[300px]'>
      <div
        className='flex flex-col gap-2 bg-primary-100 rounded-md py-3 px-6 lg:mt-8 text-neutral-50 hover:bg-primary-200 cursor-pointer transition'
        onClick={(e) => onAction(e, 'createMeal')}
      >
        <Soup className='mx-auto text-primary-600' size={22} />
        <span className='text-center text-xs text-primary-600 font-semibold'>
          Create a meal
        </span>
      </div>
      <Separator className='mt-8' />
    </ScrollArea>
  );
};

export default MealsTab;
