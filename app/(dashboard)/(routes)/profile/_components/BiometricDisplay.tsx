interface BiometricDisplayProps {
  value: number | string;
  label: string;
}

const BiometricDisplay = ({ value, label }: BiometricDisplayProps) => {
  return (
    <div className='flex flex-col text-center gap-1'>
      <span className='text-md sm:text-lg text-primary-600 font-semibold'>
        {value}
      </span>
      <span className='text-xs text-primary-400 font-semibold'>{label}</span>
    </div>
  );
};

export default BiometricDisplay;
