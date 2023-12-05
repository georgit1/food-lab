"use client";

import { Meal } from "@prisma/client";
import { PlusCircle } from "lucide-react";

import { WholeFoodWithCategory } from "@/types/types";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { ModalType, useModal } from "@/hooks/useModalStore";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

interface CalculatorHeaderProps {
  foodData: WholeFoodWithCategory[];
  mealData: Meal[];
}

const CalculatorHeader = ({ foodData, mealData }: CalculatorHeaderProps) => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData, mealData });
  };

  return (
    <div className="flex items-center justify-between">
      <PageHeader
        header="Put together a meal"
        subtext="create a meal and analyze personalized nutrients"
      />
      {isSmallScreen ? (
        <Button
          className="fixed bottom-6 right-6 z-50 h-auto rounded-full bg-primary-600 p-4 shadow-md"
          onClick={(e) => onAction(e, "chooseFood")}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          className="h-auto p-2.5 lg:rounded-md"
          onClick={(e) => onAction(e, "chooseFood")}
        >
          <PlusCircle className="h-5 w-5" />
          <span className="ml-2">Add Food</span>
        </Button>
      )}
    </div>
  );
};

export default CalculatorHeader;
