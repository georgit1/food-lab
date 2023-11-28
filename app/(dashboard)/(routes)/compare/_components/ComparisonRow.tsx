interface ComparisonRowProps {
  label: string;
  leftValue: number;
  rightValue: number;
}

const ComparisonRow = ({
  label,
  leftValue,
  rightValue,
}: ComparisonRowProps) => {
  const isLeftWinner =
    rightValue !== 0 && leftValue !== 0 && leftValue > rightValue;
  const isRightWinner =
    rightValue !== 0 && leftValue !== 0 && rightValue > leftValue;

  return (
    <div className='flex justify-center items-center gap-1 my-1 px-4'>
      <span className='min-w-[36px] text-primary-800 text-sm font-semibold'>
        {leftValue?.toFixed(1)}
      </span>
      <div className='flex items-center gap-2 whitespace-nowrap overflow-x-hidden'>
        <span className='text-md text-primary-300 font-semibold overflow-x-hidden'>
          - - - - - - - - - - - -
        </span>
        <span
          className={`flex-shrink-0 h-1.5 w-1.5 rounded-full bg-primary-500 transform translate-y-1/3 ${
            isLeftWinner ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <span className='min-w-[7rem] text-md text-primary-800 font-semibold'>
        {label}
      </span>

      <div className='flex items-center gap-2 whitespace-nowrap overflow-x-hidden'>
        <span
          className={`h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500 transform translate-y-0.5 ${
            isRightWinner ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <span className='text-md text-primary-300 font-semibold'>
          - - - - - - - - - - - -
        </span>
      </div>

      <span className='min-w-[40px] text-left text-primary-800 text-sm font-semibold'>
        {rightValue?.toFixed(1)}
      </span>
    </div>
  );
};

export default ComparisonRow;
