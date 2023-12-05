import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-8 w-[250px]' />
          <Skeleton className='h-4 w-[320px]' />
        </div>
        <Skeleton className='hidden sm:block h-10 w-[120px]' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8'>
        <Skeleton className='h-[300px] w-full' />
        <Skeleton className='h-[300px] w-full' />
        <Skeleton className='h-[300px] lg:col-span-2' />
      </div>
    </>
  );
}
