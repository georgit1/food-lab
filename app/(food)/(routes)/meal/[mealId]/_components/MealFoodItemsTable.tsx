"use client";

import { ArrowUpDown } from "lucide-react";
import { Meal, MealFood } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useEffect, useState } from "react";

import { useMeal } from "@/context/MealContext";
import { useCalculator } from "@/context/CalculatorContext";
import {
  WholeFoodWithCategory,
  WholeFoodWithCategoryWithQuantity,
} from "@/types/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import StackedTextWithImage from "@/components/StackedTextWithImage";
import DeleteMealButton from "./DeleteMealButton";

type WholeMeal = Meal & {
  mealFoods: Array<MealFood & { food: WholeFoodWithCategory }>;
};
interface MealFoodItemsTableProps {
  initialData: WholeMeal;
}

const MealFoodItemsTable = ({ initialData }: MealFoodItemsTableProps) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const { initialEntries } = useCalculator();
  const { addMealEntry, mealEntries, updateMealEntry } = useMeal();

  useEffect(() => {
    if (mealEntries.length === 0 && initialData.mealFoods.length !== 0) {
      // if user opens already stored meal
      initialData.mealFoods
        .map(({ food, quantity }) => ({ food, quantity }))
        ?.forEach(({ food, quantity }) => {
          addMealEntry(food, quantity);

          // BUG updateMealEntries sometimes gets executed before addMealEntry has finised due to async behaviour
          // therefore the originalValues not yet set and therefore values gets updated to 0 beacause of fallback
          // in updateNutrientArray in MealContext
          updateMealEntry(food.id, quantity);
        });
    } else if (initialEntries.length !== 0) {
      // if user have created a meal based on selected values in calculator page
      initialEntries.forEach((entry) => {
        addMealEntry(
          entry as WholeFoodWithCategoryWithQuantity,
          entry.quantity,
        );

        // BUG updateMealEntries sometimes gets executed before addMealEntry has finised due to async behaviour
        // therefore the originalValues not yet set and therefore values gets updated to 0 beacause of fallback
        // in updateNutrientArray in MealContext
        updateMealEntry(entry.id, entry.quantity || 100);
      });
    }
    // don't add missing dependencies
  }, [initialEntries]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedMealEntries = mealEntries.slice().sort((a, b) => {
    const comparison =
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    foodId: string,
  ) => {
    const quantity = Number(event.target.value);
    updateMealEntry(foodId, quantity);
  };

  const MotionTableBody = motion(TableBody);
  const MotionTableRow = motion(TableRow);

  return (
    <ScrollArea className="min-h-[300px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex w-max items-center">
              <span className="mr-2 truncate">Title</span>
              <button onClick={toggleSortOrder}>
                <ArrowUpDown size={15} />
              </button>
            </TableHead>
            <TableHead className="w-0 sm:w-max">
              <span className="hidden sm:block">Preference</span>
            </TableHead>
            <TableHead>Quantity (g)</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMealEntries.length !== 0 && (
            <AnimatePresence>
              {sortedMealEntries.map((item) => {
                return (
                  <MotionTableRow
                    layout
                    key={item.id}
                    exit={{ y: -30, opacity: 0 }}
                  >
                    <StackedTextWithImage
                      isCreator={item.isCreator}
                      imageSrc={item.imageUrl || ""}
                      title={item.title}
                      subtext={item.category.name}
                    />

                    <TableCell>
                      {item.preference ? (
                        <span className="mr-1 hidden w-0 whitespace-nowrap rounded-full border border-primary-600 px-2 py-1 text-xs text-primary-600 sm:inline sm:w-full">
                          {item.preference}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        defaultValue={item.quantity}
                        onChange={(e) => handleChangeQuantity(e, item.id)}
                        className="max-w-[80px]"
                        placeholder="100"
                        maxLength={3}
                        min={0}
                        max={999}
                      />
                    </TableCell>
                    <TableCell className="max-w-fit">
                      <DeleteMealButton mealId={item.id} />
                    </TableCell>
                  </MotionTableRow>
                );
              })}
            </AnimatePresence>
          )}
        </TableBody>
        {sortedMealEntries.length === 0 && (
          <MotionTableBody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.1 }}
          >
            <TableCell />
            <TableCell className="whitespace-nowrap pt-10 text-neutral-400">
              No food selected
            </TableCell>
            <TableCell />
          </MotionTableBody>
        )}
      </Table>
    </ScrollArea>
  );
};

export default MealFoodItemsTable;
