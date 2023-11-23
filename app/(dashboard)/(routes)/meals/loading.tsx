import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-5'>
      <Skeleton className='h-8 w-[250px]' />

      <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]'>
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className='h-[120px] w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
}
