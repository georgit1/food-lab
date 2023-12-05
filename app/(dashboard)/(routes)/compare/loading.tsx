import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-8 w-48 sm:w-[270px]' />
          <Skeleton className='h-4 w-56 sm:w-[340px]' />
        </div>
        <Skeleton className='h-10 w-10' />
      </div>

      <div className='grid grid-cols-2 mt-10'>
        <div className='mx-auto'>
          <Skeleton className='h-10 w-full sm:w-[220px]' />
          <div className='flex items-center justify-center gap-4 mt-4'>
            <Skeleton className='h-12 w-12 sm:h-14 sm:w-14 rounded-full' />
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-3.5 w-16' />
              <Skeleton className='h-2 w-20' />
            </div>
          </div>
        </div>
        <div className='mx-auto'>
          <Skeleton className='h-10 w-full sm:w-[220px]' />
          <div className='flex items-center justify-center gap-4 mt-4'>
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-16 ml-auto' />
              <Skeleton className='h-2 w-20 ml-auto' />
            </div>
            <Skeleton className='h-12 w-12 sm:h-14 sm:w-14 rounded-full' />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-2.5 mt-10'>
        <Skeleton className='h-4 w-24 mx-auto' />
        <Skeleton className='h-4 w-5 mx-auto' />
        <div className='flex flex-col gap-1 w-full max-w-[200px] mx-auto'>
          <div className='flex justify-evenly'>
            <Skeleton className='h-2 w-7' />
            <Skeleton className='h-2 w-12' />
            <Skeleton className='h-2 w-9' />
          </div>
          <Skeleton className='h-1.5 w-full' />
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-14'>
        <div className='w-full max-w-[850px] flex justify-between mx-auto px-10 sm:px-40'>
          <Skeleton className='h-4 w-5' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-5' />
        </div>
        <div className='w-full max-w-[850px] flex justify-between mx-auto px-10 sm:px-40'>
          <Skeleton className='h-4 w-5' />
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-4 w-5' />
        </div>
      </div>

      <div className='grid grid-cols-2 mt-16'>
        <Skeleton className='h-32 w-32 sm:h-36 sm:w-36 mx-auto rounded-full' />
        <Skeleton className='h-32 w-32 sm:h-36 sm:w-36  mx-auto rounded-full' />
      </div>
    </>
  );
}
