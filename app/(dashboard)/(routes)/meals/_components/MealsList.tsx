"use client";

import { PlusCircle } from "lucide-react";

import { ModalType, useModal } from "@/hooks/useModalStore";
import { MealWithMealFoodWithFood } from "@/types/types";

import MealCard from "./MealCard";
import { Button } from "@/components/ui/button";

interface MealsListProps {
  items: MealWithMealFoodWithFood[];
}

const MealsList = ({ items }: MealsListProps) => {
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action);
  };

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        {items.map((item) => (
          <MealCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            foodTitles={item.mealFoods.map((food) => food.food.title)}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="mt-10 flex flex-col gap-8 text-center text-sm text-muted-foreground">
          <span>No Meals available</span>
          <Button
            className="mx-auto w-full space-x-2 sm:w-max"
            onClick={(e) => onAction(e, "createMeal")}
          >
            <PlusCircle className="h-5 w-5" />
            <span>Create Meal</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MealsList;
