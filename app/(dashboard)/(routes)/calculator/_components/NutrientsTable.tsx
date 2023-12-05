"use client";

import { Ref, forwardRef } from "react";
import { User } from "lucide-react";

import {
  MineralItemsType,
  TraceElementItemsType,
  VitaminItemsType,
} from "@/constants/nutrients";
import { useCalculator } from "@/context/CalculatorContext";
import { NutrientData } from "@/utils/calcPersonalNutrients";
import { parseDecimal } from "@/utils/convertUtils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconBadge from "@/components/IconBadge";
import Attention from "./Attention";

interface NutrientsTableProps {
  nutrients: MineralItemsType | TraceElementItemsType | VitaminItemsType;
  nutrientsItems: string[];
  requiredNutrients: NutrientData;
}

const NutrientsTable = forwardRef(function NutrientsTable(
  props: NutrientsTableProps,
  tooltipRef: Ref<HTMLDivElement>,
) {
  const { nutrients, nutrientsItems, requiredNutrients } = props;
  const { missingNutrients } = useCalculator();

  const isRequiredValues = Object.values(requiredNutrients).every(Boolean);

  const nutrientsData = nutrientsItems.map((nutrient) => {
    if (nutrient in nutrients) {
      // capitalize + add space between lower and uppercase letters
      const nutrientTitle = nutrient
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());

      const acutalValue = nutrients[
        nutrient as keyof typeof nutrients
      ] as unknown as number;

      const requiredValue = parseDecimal(
        requiredNutrients[nutrient as keyof typeof nutrients],
      ) as unknown as number;

      const nutrientUnit = (nutrients as any)[nutrient + "Unit"];

      const percentage = requiredValue
        ? (
            (parseDecimal(acutalValue || "") / parseDecimal(requiredValue)) *
            100
          ).toFixed(1)
        : "-";

      return {
        title: nutrientTitle,
        amount: `${acutalValue?.toFixed(1)}${nutrientUnit}${
          requiredValue ? `/ ${requiredValue}${nutrientUnit}` : ""
        }`,
        daily: percentage,
        nutrient,
      };
    } else {
      return null;
    }
  });

  const filteredNutrientsData = nutrientsData.filter((item) =>
    Boolean(!item?.amount.includes("null")),
  );

  return (
    <Table className="flex-shrink-0">
      <TableHeader>
        <TableRow>
          <TableHead>Nutrient</TableHead>
          <TableHead className="flex items-center gap-2">
            <span>{isRequiredValues ? "Amount / Daily Intake" : "Amount"}</span>
            {isRequiredValues && <IconBadge icon={User} size="xs" />}
          </TableHead>
          <TableHead className="flex-inline items-center justify-between gap-2">
            <span>daily %</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredNutrientsData.map((nutrient) => {
          if (!nutrient?.amount.includes("undefined")) {
            const missingNutrient = missingNutrients.find(
              (item) => item[nutrient?.nutrient as string]!,
            );

            return (
              <TableRow key={nutrient?.title} className="p-1">
                <TableCell>
                  <span className="flex items-center gap-1">
                    {nutrient?.title}
                    {missingNutrients.some(
                      (item) => item[nutrient?.nutrient as string],
                    ) ? (
                      <Attention
                        title={nutrient?.title || ""}
                        missingItems={
                          Object.values(missingNutrient || "")[0] as string[]
                        }
                        ref={tooltipRef}
                      />
                    ) : (
                      ""
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
});

export default NutrientsTable;
