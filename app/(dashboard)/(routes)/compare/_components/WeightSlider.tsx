import { Slider } from "@/components/ui/slider";

interface WeightSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const WeightSlider = ({ label, value, onValueChange }: WeightSliderProps) => {
  const handleValueChange = (value: number[]) => {
    const [number] = value;

    onValueChange(number);
  };
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm font-semibold text-primary-800">
        <span className="">{label}</span>
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
