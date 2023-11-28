import { cn } from '@/lib/utils';

interface PillCheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const PillCheckbox = ({ label, checked, onChange }: PillCheckBoxProps) => {
  return (
    <label
      className={cn(
        'relative rounded-full border text-primary-600 border-primary-600 flex items-center py-1 px-3 text-sm cursor-pointer hover:border-2 transition  duration-300',
        checked && 'border-2 font-semibold'
      )}
    >
      {label}
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='absolute h-0 w-0 opacity-0'
      />
    </label>
  );
};

export default PillCheckbox;
