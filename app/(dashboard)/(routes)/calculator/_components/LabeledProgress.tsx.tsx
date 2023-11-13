import { Progress } from '@/components/ui/progress';

interface LabeledProgessProps {
  label: string;
  value: number | string;
  maxValue: number | string;
  unit?: string;
  className?: string;
}

const LabeledProgess = ({
  label,
  value,
  maxValue,
  unit,
  className,
}: LabeledProgessProps) => {
  const progress = (Number(value) / Number(maxValue)) * 100;
  const progressValue = progress < 100 ? progress : 100;

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <div className='flex gap-2 text-sm'>
        <label className='text-primary-600 font-semibold'>{label}</label>
        <span className='text-primary-500 font-semibold'>{`${value} / ${maxValue}${
          unit ? unit : ''
        }`}</span>
      </div>
      <Progress className='h-1.5 w-full bg-neutral-200' value={progressValue} />
    </div>
  );
};

export default LabeledProgess;
