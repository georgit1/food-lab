import { FoodEntry, MealEntry } from "@/types/types";

import MealItemsTable from "./MealItemsTable";
import FoodItemsTable from "./FoodItemsTable";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FoodTableItemProps {
  foodEntries: FoodEntry[];
  mealEntries: MealEntry[];
}

const FoodTableItem = ({ foodEntries, mealEntries }: FoodTableItemProps) => {
  return (
    <div className="rounded-md bg-primary-50 p-2">
      <ScrollArea className="h-[300px]">
        <FoodItemsTable foodEntries={foodEntries} />
        {mealEntries.length > 0 && <MealItemsTable mealEntries={mealEntries} />}
      </ScrollArea>
    </div>
  );
};

export default FoodTableItem;
