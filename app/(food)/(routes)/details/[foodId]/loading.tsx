import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-8 w-[250px]' />
        <Skeleton className='h-4 w-[320px]' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 grid-rows-[1fr, 0.3fr, 1fr] gap-4 mt-8'>
        <Skeleton className='w-full h-[260px] col-span-2 sm:col-span-1 order-1' />
        <Skeleton className='w-full h-[260px] col-span-2 sm:col-span-2 lg:col-span-1 order-2' />
        <Skeleton className='w-full h-full row-span-3 col-span-3 order-6 lg:order-3' />
        <Skeleton className='w-full h-[65px] order-3 sm:col-span-1 lg:col-span-1 lg:order-4' />
        <Skeleton className='w-full h-[65px] order-4 sm:col-span-1 lg:col-span-1 lg:order-5' />
        <Skeleton className='w-full h-[250px] col-span-2 order-5 lg:order-6' />
      </div>
    </>
  );
}
