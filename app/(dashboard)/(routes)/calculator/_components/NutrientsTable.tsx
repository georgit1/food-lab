'use client';

import { HelpCircle, User } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import IconBadge from '@/components/IconBadge';
import {
  MineralItemsType,
  TraceElementItemsType,
  VitaminItemsType,
} from '@/constants/nutrients';
import { useCalculator } from '@/context/CalculatorContext';
import Attention from './Attention';
import { parseDecimal } from '@/lib/utils';
import { NutrientData } from '@/utils/calcPersonalNutrients';

interface NutrientsTableProps {
  nutrients: MineralItemsType | TraceElementItemsType | VitaminItemsType;
  nutrientsItems: string[];
  requiredNutrients: NutrientData;
}

const NutrientsTable = ({
  nutrients,
  nutrientsItems,
  requiredNutrients,
}: NutrientsTableProps) => {
  const { missingNutrients } = useCalculator();

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

      const requiredValue = parseDecimal(
        requiredNutrients[nutrient as keyof typeof nutrients]
      ) as unknown as number;

      const nutrientUnit = (nutrients as any)[nutrient + 'Unit'];

      const percentage = requiredValue
        ? (
            (parseDecimal(acutalValue || '') / parseDecimal(requiredValue)) *
            100
          ).toFixed(1)
        : '-';

      return {
        title: nutrientTitle,
        amount: `${acutalValue?.toFixed(1)}${nutrientUnit}${
          requiredValue ? `/ ${requiredValue}${nutrientUnit}` : ''
        }`,
        daily: percentage,
        nutrient,
      };
    } else {
      return null;
    }
  });

  const filteredNutrientsData = nutrientsData.filter((item) =>
    Boolean(!item?.amount.includes('null'))
  );

  return (
    <Table className='flex-shrink-0'>
      <TableHeader>
        <TableRow>
          <TableHead>Nutrient</TableHead>
          <TableHead className='flex items-center gap-2'>
            <span>{isRequiredValues ? 'Amount / Daily Intake' : 'Amount'}</span>
            {isRequiredValues && <IconBadge icon={User} size='xs' />}
          </TableHead>
          <TableHead className='flex-inline justify-between items-center gap-2'>
            <span>daily %</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* TODO - ts error */}
        {filteredNutrientsData.map((nutrient) => {
          if (!nutrient?.amount.includes('undefined')) {
            const missingNutrient = missingNutrients.find(
              (item) => item[nutrient?.nutrient]!
            );

            return (
              <TableRow key={nutrient?.title} className='p-1'>
                <TableCell>
                  <span className='flex items-center gap-1'>
                    {nutrient?.title}
                    {missingNutrients.some(
                      (item) => item[nutrient?.nutrient]
                    ) ? (
                      // TODO on scroll Attention should dissappear
                      <Attention
                        title={nutrient?.title || ''}
                        // @ts-expect-error
                        missingItems={Object.values(missingNutrient || '')[0]}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </TableCell>
                <TableCell>{nutrient?.amount}</TableCell>
                <TableCell>{nutrient?.daily}</TableCell>
              </TableRow>
            );
          }
        })}
      </TableBody>
    </Table>
  );
};

export default NutrientsTable;
