import { Mineral, TraceElement, Vitamin } from '@prisma/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { IconBadge } from './IconBadge';
import { User } from 'lucide-react';

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
        // amount: `${acutalValue}${nutrientUnit} / ${requiredValue}${nutrientUnit}`,
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nutrient</TableHead>
          <TableHead className='flex items-center gap-2 text-center'>
            {/* TODO - personal badge */}
            <span>
              {requiredNutrients ? 'Amount / Daily Intake' : 'Amount'}
            </span>
            {requiredNutrients && <IconBadge icon={User} size='xs' />}
          </TableHead>
          <TableHead>daily %</TableHead>
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
  );
};

export default NutrientsTable;
