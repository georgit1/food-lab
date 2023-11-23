import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='mb-3 md:hidden md:mb-0'>
        <Skeleton className='h-10 w-full rounded-full' />
      </div>
      <div className='space-y-5 pb-4'>
        <div className='flex items-center gap-x-2 overflow-x-auto'>
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className='h-8 w-28' />
          ))}
        </div>

        <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]'>
          {Array.from({ length: 10 }, (_, index) => (
            <Skeleton key={index} className='h-[230px] w-full rounded-xl' />
          ))}
        </div>
      </div>
    </>
  );
}
