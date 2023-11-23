import qs from 'query-string';
import { cn } from '@/utils/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface CategoryItemProps {
  label: string;
  value?: string;
}

const CategoryItem = ({ label, value }: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get('categoryId');
  const currentTitle = searchParams.get('title');

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'py-1.5 px-3 text-sm border border-neutral-200 rounded-lg flex items-center gap-x-1 hover:border-primary-700 transition',
        isSelected && 'border-primary-700 bg-neutral-200/20 text-primary-800'
      )}
      type='button'
    >
      <div className='truncate'>{label}</div>
    </button>
  );
};

export default CategoryItem;
