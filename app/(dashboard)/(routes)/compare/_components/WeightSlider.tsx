import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

interface WeightSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const WeightSlider = ({ label, value, onValueChange }: WeightSliderProps) => {
  const [currValue, setCurrValue] = useState<number[]>([100]);

  const handleValueChange = (value: number[]) => {
    const [number] = value;

    setCurrValue(value);
    onValueChange(number);
  };
  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between text-sm text-primary-800 font-semibold'>
        <span className=''>{label}</span>
        <span>{`${value}%`}</span>
      </div>
      <Slider
        value={[value]}
        max={100}
        step={5}
        onValueChange={(value) => handleValueChange(value)}
      />
    </div>
  );
};

export default WeightSlider;
