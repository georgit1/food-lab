interface LoaderProps {
  twColor?: string;
  className?: string;
}

const Loader = ({ twColor = 'neutral-50', className }: LoaderProps) => {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      <div
        className={`w-[4px] h-[4px] rounded-full animate-pulse bg-${twColor}`}
      ></div>
      <div
        className={`w-[4px] h-[4px] rounded-full animate-pulse bg-${twColor}`}
      ></div>
      <div
        className={`w-[4px] h-[4px] rounded-full animate-pulse bg-${twColor}`}
      ></div>
    </div>
  );
};

export default Loader;
