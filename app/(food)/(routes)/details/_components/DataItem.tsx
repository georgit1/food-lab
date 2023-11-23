import { title } from 'process';

interface DataItemProps {
  value: number;
  label: string;
  unit?: string;
  className?: string;
}

const DataItem = ({ value, label, unit, className }: DataItemProps) => {
  return (
    <div
      className={`col-span-2 sm:col-span-1 flex flex-col w-full h-full bg-primary-50 rounded-md p-2 text-center ${className}`}
    >
      <span className='text-neutral-400 text-md font-semibold'>{label}</span>
      <span className='text-primary-600 font-semibold text-xl'>
        {value} {unit && <span>{unit}</span>}
      </span>
    </div>
  );
};

export default DataItem;
