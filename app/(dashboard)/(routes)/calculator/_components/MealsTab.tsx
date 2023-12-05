import { Soup } from "lucide-react";

import { ModalType, useModal } from "@/hooks/useModalStore";
import { MealWithMealFoodWithFood, WholeFoodWithCategory } from "@/types/types";

import ToggleMealButton from "./ToggleMealButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StackedTextWithImage from "@/components/StackedTextWithImage";

interface MealsTabProps {
  foodData: WholeFoodWithCategory[];
  mealData: MealWithMealFoodWithFood[];
}

const MealsTab = ({ foodData, mealData }: MealsTabProps) => {
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData });
  };

  return (
    <ScrollArea className="h-[400px] text-center">
      <div
        className="mt-6 inline-block cursor-pointer rounded-md bg-primary-100 px-6 py-3 text-neutral-50 transition hover:bg-primary-200/60"
        onClick={(e) => onAction(e, "createMeal")}
      >
        <Soup className="mx-auto text-primary-600" size={22} />
        <span className="text-center text-xs font-semibold text-primary-600">
          Create a meal
        </span>
      </div>
      <Separator className="mt-6" />

      {/* Table */}
      {mealData.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>My Meals</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {mealData.map((item) => {
              return (
                <TableRow key={item.id}>
                  <StackedTextWithImage
                    imageSrc={item.imageUrl || ""}
                    title={item.title}
                    subtext={item.mealFoods
                      .map((item) => item.food.title)
                      .join(", ")}
                    isMeal={true}
                  />
                  <TableCell>
                    <ToggleMealButton mealItem={item} mealId={item.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
      {mealData.length === 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          No Meals available
        </div>
      )}
    </ScrollArea>
  );
};

export default MealsTab;
