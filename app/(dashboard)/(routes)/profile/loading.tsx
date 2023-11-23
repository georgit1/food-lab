import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className='flex flex-col gap-3'>
        <Skeleton className='h-8 w-[250px]' />
        <Skeleton className='h-4 w-[320px]' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
        <Skeleton className='h-[400px] w-full' />
        <Skeleton className='h-[400px] w-full' />
      </div>
    </>
  );
}
