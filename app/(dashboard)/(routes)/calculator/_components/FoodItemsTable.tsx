import { ChangeEvent, useState } from 'react';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { Category, Food } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import StackedTextWithImage from '@/components/StackedTextWithImage';
import { Input } from '@/components/ui/input';
import { useCalculator } from '@/context/calculatorContext';
import { cn, truncateString } from '@/lib/utils';

type FoodWithCategory = Food & {
  category: Category;
};

interface FoodItemsTableProps {
  choosenFood: FoodWithCategory[];
}

const FoodItemsTable = ({ choosenFood }: FoodItemsTableProps) => {
  const { updateFoodEntry, toggleEnable } = useCalculator();
  const [disabledRows, setDisabledRows] = useState<string[]>([]);
  const { clearAll } = useCalculator();

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    foodId: string
  ) => {
    const quantity = Number(event.target.value);
    updateFoodEntry(foodId, quantity);
  };

  const handleCheckboxChange = (foodId: string) => {
    toggleEnable(foodId);
    setDisabledRows((prevRows) =>
      prevRows.includes(foodId)
        ? prevRows.filter((rowId) => rowId !== foodId)
        : [...prevRows, foodId]
    );
  };

  return (
    <>
      {choosenFood.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Quantity(g)</TableHead>
              <TableHead className='w-0 sm:w-max'>
                <span className='hidden sm:block'>Preference</span>
              </TableHead>
              <TableHead className='text-xl font-bold mb-2 cursor-pointer'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className='absolute top-3 right-1 p-1 rounded-full bg-primary-50 hover:bg-primary-100 transition'>
                      <MoreHorizontal
                        size={20}
                        className='text-primary-600 cursor-pointer hover'
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='left'>
                    <DropdownMenuItem
                      // onClick={onClick}
                      className='cursor-pointer text-primary-800'
                    >
                      <Edit className='mr-2 h-4 w-4' />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={clearAll}
                      className='cursor-pointer text-red-600'
                    >
                      <Trash className='mr-2 h-4 w-4' />
                      <span>Clear List</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {choosenFood.map((item) => (
              <TableRow key={item.id}>
                <StackedTextWithImage
                  isCreator={item.isCreator}
                  imageSrc={item.imageUrl || ''}
                  title={truncateString(item.title, 7)}
                  subtext={item.category.name}
                  variant={
                    disabledRows.includes(item.id) ? 'disabled' : 'default'
                  }
                />
                <TableCell>
                  <Input
                    type='number'
                    defaultValue={100}
                    onChange={(e) => handleChangeQuantity(e, item.id)}
                    disabled={disabledRows.includes(item.id)}
                    className='max-w-[80px]'
                  />
                  {/* <FavoriteButton
                    favoriteIds={favorites.map((favorite) => favorite.id)}
                    foodId={favorite.id}
                    size='sm'
                  /> */}
                </TableCell>
                <TableCell>
                  {item.preference ? (
                    <span
                      className={cn(
                        'whitespace-nowrap text-xs text-primary-600 border border-primary-600 py-1 px-2 rounded-full mr-1 hidden w-0 sm:inline sm:w-full',
                        disabledRows.includes(item.id) &&
                          ' text-neutral-400 border border-neutral-400'
                      )}
                    >
                      {item.preference}
                    </span>
                  ) : null}
                </TableCell>
                <TableCell>
                  <Checkbox
                    defaultChecked
                    onCheckedChange={() => handleCheckboxChange(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {choosenFood.length === 0 && (
        <div className='text-center text-sm text-muted-foreground mt-6'>
          No Food items
        </div>
      )}
    </>
  );
};

export default FoodItemsTable;
