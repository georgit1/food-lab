import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-8 w-[250px]' />
          <Skeleton className='h-4 w-[320px]' />
        </div>
        <Skeleton className='hidden md:block h-10 w-[120px]' />
      </div>

      <div className='max-w-xl mx-auto mt-8 space-y-5'>
        <Skeleton className='w-full h-[310px]' />

        <div className='flex flex-col gap-3'>
          <Skeleton className='h-4 w-[100px]' />
          <Skeleton className='h-10 w-full' />
        </div>

        <div className='flex flex-col gap-3'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-20 w-full' />
        </div>

        <Skeleton className='h-10 w-full mt-16' />
      </div>
    </>
  );
}
