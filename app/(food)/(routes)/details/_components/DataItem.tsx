interface DataItemProps {
  value: number;
  label: string;
  unit?: string;
  className?: string;
}

const DataItem = ({ value, label, unit, className }: DataItemProps) => {
  return (
    <div
      className={`flex h-full w-full flex-col rounded-md bg-primary-50 p-2 text-center ${className}`}
    >
      <span className="text-md font-semibold text-neutral-400">{label}</span>
      <span className="truncate text-xl font-semibold text-primary-600">
        {value} {unit && <span>{unit}</span>}
      </span>
    </div>
  );
};

export default DataItem;
