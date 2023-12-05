import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[290px] sm:w-[320px]" />
        </div>
        <Skeleton className="hidden h-10 w-full sm:block sm:w-[100px]" />
      </div>

      <div className="grid-rows-[1fr, 0.3fr, 1fr] mt-8 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        <Skeleton className="order-1 col-span-2 h-[260px] w-full sm:col-span-1" />
        <Skeleton className="order-2 col-span-2 h-[260px] w-full sm:col-span-2 lg:col-span-1" />
        <Skeleton className="order-6 col-span-3 row-span-3 hidden h-full w-full sm:block lg:order-3" />
        <Skeleton className="order-4 col-span-3 h-[65px] w-full sm:col-span-2 lg:order-5 lg:col-span-1 lg:row-span-2" />
        <Skeleton className="order-3 col-span-3 h-[65px] w-full sm:col-span-1 lg:order-4 lg:col-span-1 lg:row-span-2" />
        <Skeleton className="order-5 col-span-3 hidden h-[250px] w-full sm:block lg:order-6 lg:col-span-5" />
      </div>
    </>
  );
}
