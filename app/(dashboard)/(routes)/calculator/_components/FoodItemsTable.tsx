"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { BookmarkPlus, MoreHorizontal, Trash } from "lucide-react";

import { FoodEntry } from "@/types/types";
import { useMeal } from "@/context/MealContext";
import { useCalculator } from "@/context/CalculatorContext";
import { ModalType, useModal } from "@/hooks/useModalStore";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import StackedTextWithImage from "@/components/StackedTextWithImage";

interface FoodItemsTableProps {
  foodEntries: FoodEntry[];
}

const FoodItemsTable = ({ foodEntries }: FoodItemsTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [disabledRows, setDisabledRows] = useState<string[]>([]);
  const { onOpen } = useModal();
  const { updateFoodEntry, toggleEnableFood, clearAll } = useCalculator();

  // prevent hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    foodId: string,
  ) => {
    const quantity = Number(event.target.value);
    updateFoodEntry(foodId, quantity);
  };

  const handleCheckboxChange = (foodId: string) => {
    toggleEnableFood(foodId);
    setDisabledRows((prevRows) =>
      prevRows.includes(foodId)
        ? prevRows.filter((rowId) => rowId !== foodId)
        : [...prevRows, foodId],
    );
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, undefined, "initial");
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Foods</TableHead>
            <TableHead>Quantity(g)</TableHead>
            <TableHead className="mb-2 cursor-pointer text-xl font-bold">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="absolute right-4 top-3 rounded-full bg-primary-50 p-1 transition hover:bg-primary-100">
                    <MoreHorizontal
                      size={20}
                      className="hover cursor-pointer text-primary-600"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left">
                  <DropdownMenuItem
                    disabled={foodEntries.length < 2}
                    onClick={(e) => {
                      onAction(e, "createMeal");
                    }}
                    className="cursor-pointer text-primary-800"
                  >
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    <span>Save as Meal</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearAll}
                    className="cursor-pointer text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Clear List</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
          </TableRow>
        </TableHeader>
        {foodEntries.length != 0 && (
          <TableBody>
            {foodEntries.map((item) => (
              <TableRow key={item.id}>
                <StackedTextWithImage
                  isCreator={item.isCreator}
                  imageSrc={item.imageUrl || ""}
                  title={item.title}
                  subtext={item.category}
                  variant={
                    disabledRows.includes(item.id) ? "disabled" : "default"
                  }
                />
                <TableCell>
                  <Input
                    type="number"
                    onChange={(e) => handleChangeQuantity(e, item.id)}
                    disabled={disabledRows.includes(item.id)}
                    className="max-w-[80px]"
                    defaultValue={item.quantity}
                    maxLength={3}
                    min={0}
                    max={999}
                  />
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
        )}
        {foodEntries.length === 0 && (
          <TableRow>
            <TableCell />
            <TableCell className="pt-20 text-neutral-400">
              No food items
            </TableCell>
            <TableCell />
          </TableRow>
        )}
      </Table>
    </>
  );
};

export default FoodItemsTable;
