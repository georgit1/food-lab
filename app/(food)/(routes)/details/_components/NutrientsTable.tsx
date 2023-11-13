import { HelpCircle, User } from 'lucide-react';
import { Mineral, TraceElement, Vitamin } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../components/ui/table';
import { IconBadge } from '../../../../../components/IconBadge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../../components/ui/popover';

interface NutrientsTableProps {
  nutrients: Mineral | TraceElement | Vitamin;
  nutrientsItems: string[];
  requiredNutrients: Record<string, number>;
}

const NutrientsTable = ({
  nutrients,
  nutrientsItems,
  requiredNutrients,
}: NutrientsTableProps) => {
  const isRequiredValues = Object.values(requiredNutrients).every(Boolean);

  const nutrientsData = nutrientsItems.map((nutrient) => {
    if (nutrient in nutrients) {
      // capitalize + add space between lower and uppercase letters
      const nutrientTitle = nutrient
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, (str) => str.toUpperCase());

      const acutalValue = nutrients[
        nutrient as keyof typeof nutrients
      ] as unknown as number;

      const requiredValue = requiredNutrients[
        nutrient as keyof typeof nutrients
      ] as unknown as number;

      const nutrientUnit = (nutrients as any)[nutrient + 'Unit'];

      const percentage = requiredValue
        ? ((parseFloat(acutalValue) / parseFloat(requiredValue)) * 100).toFixed(
            1
          )
        : '-';

      return {
        title: nutrientTitle,
        amount: `${acutalValue}${nutrientUnit}${
          requiredValue ? `/ ${requiredValue}${nutrientUnit}` : ''
        }`,
        daily: percentage,
      };
    } else {
      return null;
    }
  });

  const filteredNutrientsData = nutrientsData.filter((item) =>
    Boolean(!item?.amount.includes('null'))
  );

  return (
    // TODO - maybe background image - if not clear whole div
    // <div className="bg-cover bg-no-repeat bg-center bg-[url('/molecules.jpg')]">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nutrient</TableHead>
          <TableHead className='flex items-center gap-2'>
            <span>{isRequiredValues ? 'Amount / Daily Intake' : 'Amount'}</span>
            {isRequiredValues && <IconBadge icon={User} size='xs' />}
          </TableHead>
          {/* TODO - place Iconbadge */}
          <TableHead className='flex-inline justify-between items-center gap-2'>
            <span>daily %</span>
            <Popover>
              <PopoverTrigger asChild>
                {!isRequiredValues && (
                  <IconBadge
                    icon={HelpCircle}
                    size='sm'
                    className='cursor-pointer'
                  />
                )}
              </PopoverTrigger>
              <PopoverContent side='top' className='w-full'>
                <p className='text-sm px-1'>login for personalized info</p>
              </PopoverContent>
            </Popover>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredNutrientsData.map((nutrient) => (
          <TableRow key={nutrient?.title} className='p-1'>
            <TableCell>{nutrient?.title}</TableCell>
            <TableCell>{nutrient?.amount}</TableCell>
            <TableCell>{nutrient?.daily}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // </div>
  );
};

export default NutrientsTable;
