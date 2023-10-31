interface PageHeaderProps {
  header: string;
  subtext?: string;
}

const PageHeader = ({ header, subtext }: PageHeaderProps) => {
  return (
    <div className='flex flex-col gap-1'>
      <h1 className='text-2xl text-primary-700 font-semibold'>{header}</h1>
      {subtext && <span className='text-sm text-neutral-500'>{subtext}</span>}
    </div>
  );
};

export default PageHeader;
