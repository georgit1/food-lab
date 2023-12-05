"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";

import { WholeFoodWithCategory } from "@/types/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import StackedTextWithImage from "@/components/StackedTextWithImage";
import ToggleFoodButton from "./ToggleFoodButton";

interface FoodItemsTabProps {
  foodData: WholeFoodWithCategory[];
  useCase?: string;
}

const FoodItemsTab = ({ foodData, useCase }: FoodItemsTabProps) => {
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // sort favorites based on the current sort order
  const sortedFoodData = foodData.slice().sort((a, b) => {
    const comparison =
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  return (
    <ScrollArea className="h-[400px]">
      {sortedFoodData.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center">
                <span className="mr-2 truncate">Title</span>
                <button onClick={toggleSortOrder}>
                  <ArrowUpDown size={15} />
                </button>
              </TableHead>
              <TableHead className="w-0 sm:w-max">
                <span className="hidden sm:block">Attributes</span>
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedFoodData.map((item) => (
              <TableRow key={item.id}>
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
                  <ToggleFoodButton foodData={item} useCase={useCase} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {sortedFoodData.length === 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          No Food available
        </div>
      )}
    </ScrollArea>
  );
};

export default FoodItemsTab;
