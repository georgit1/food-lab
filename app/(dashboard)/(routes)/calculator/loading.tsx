import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-8 w-[250px]' />
          <Skeleton className='h-4 w-[320px]' />
        </div>
        <Skeleton className='h-10 w-full sm:w-[120px]' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
        <Skeleton className='h-[300px] w-full' />
        <Skeleton className='h-[300px] w-full' />
        <Skeleton className='h-[300px] lg:col-span-2' />
      </div>
    </>
  );
}
