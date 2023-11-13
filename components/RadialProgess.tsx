interface RadialProgessProps {
  value: number | string;
  maxValue: number | string;
  label: string;
}

const RadialProgess = ({ value, maxValue, label }: RadialProgessProps) => {
  const maxDashoffset = 925;
  const minDashoffset = 1200;

  const percentageCompletion = (Number(value) / Number(maxValue)) * 100;
  const dashoffset =
    percentageCompletion < 100
      ? minDashoffset +
        (percentageCompletion / 100) * (maxDashoffset - minDashoffset)
      : 925;

  return (
    <div className='relative w-40 h-40'>
      <svg className='w-full h-full' viewBox='0 0 100 100'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: '#0284c7', stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: '#0ea5e9', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle
          className='text-gray-200 stroke-current'
          strokeWidth='6'
          cx='50'
          cy='50'
          r='44'
          fill='transparent'
        ></circle>
        <circle
          className='progress-ring__circle'
          strokeWidth='6'
          strokeLinecap='round'
          cx='50'
          cy='50'
          r='44'
          fill='transparent'
          strokeDashoffset={dashoffset}
          stroke={`url(#gradient)`}
        ></circle>
        <foreignObject x='0' y='0' width='100%' height='100%'>
          <div className='flex flex-col items-center justify-center h-full'>
            <div className='flex items-end'>
              <span className='text-md text-primary-600 font-semibold'>
                {Number(value)}
              </span>
              <span className='text-xs text-primary-500'>
                {Number(maxValue)}
              </span>
            </div>
            <span className='text-xs text-primary-600 font-semibold'>
              {label}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default RadialProgess;
