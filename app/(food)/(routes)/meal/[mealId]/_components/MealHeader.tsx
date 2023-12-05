"use client";

import { useRouter } from "next/navigation";
import { Home, PlusCircle } from "lucide-react";

import { WholeFoodWithCategory } from "@/types/types";
import { useSmallScreen } from "@/hooks/useSmallScreen";
import { ModalType, useModal } from "@/hooks/useModalStore";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";

interface CalculatorHeaderProps {
  foodData: WholeFoodWithCategory[];
}

const MealHeader = ({ foodData }: CalculatorHeaderProps) => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const router = useRouter();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { foodData }, "meal");
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageHeader
        header="Put together a meal"
        subtext="create a meal and analyze personalized nutrients"
      />
      <div>
        {isSmallScreen ? (
          <>
            <Button
              variant={"outline"}
              className="fixed bottom-[342px] right-[27px] z-50 h-auto rounded-full p-3.5 shadow-md"
              onClick={() => router.push("/")}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              className="fixed bottom-[274px] right-6 z-50 h-auto rounded-full bg-primary-600 p-4 shadow-md"
              onClick={(e) => onAction(e, "chooseFood")}
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <div className="flex gap-4">
            <Button
              className="h-auto p-2.5 lg:rounded-md"
              onClick={() => router.push("/")}
              variant={"outline"}
            >
              <Home className="h-4 w-4" />
              <span className="ml-2">Home</span>
            </Button>
            <Button
              className="h-auto p-2.5 lg:rounded-md"
              onClick={(e) => onAction(e, "chooseFood")}
            >
              <PlusCircle className="h-5 w-5" />
              <span className="ml-2">Add Food</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealHeader;
