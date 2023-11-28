import { Progress } from '@/components/ui/progress';

interface SectionProgressProps {
  value: number;
}

const SectionProgress = ({ value }: SectionProgressProps) => {
  const getOpacityClass = (section: string) => {
    if (section === 'low' && value < 33) {
      return 'opacity-100';
    } else if (section === 'medium' && value >= 33 && value < 66) {
      return 'opacity-100';
    } else if (section === 'high' && value >= 66) {
      return 'opacity-100';
    } else {
      return 'opacity-60';
    }
  };

  return (
    <div className='w-48 flex flex-col mx-auto gap-1 mb-10'>
      <div className='flex items-end text-center text-xs text-primary-800 font-semibold'>
        <span className='bg-neutral-300 w-[1px] h-[12px]' />
        <span className={`w-[33%] ${getOpacityClass('low')}`}>low</span>
        <span className='bg-neutral-300 w-[1px] h-[12px]' />
        <span className={`w-[33%] ${getOpacityClass('medium')}`}>medium</span>
        <span className='bg-neutral-300 w-[1px] h-[12px]' />
        <span className={`w-[33%] ${getOpacityClass('high')}`}>high</span>
        <span className='bg-neutral-300 w-[1px] h-[12px]' />
      </div>
      <Progress value={value} className='h-[5px]' />
    </div>
  );
};

export default SectionProgress;
