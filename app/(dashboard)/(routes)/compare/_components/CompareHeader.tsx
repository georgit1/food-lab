"use client";

import { SlidersHorizontal } from "lucide-react";

import { useSmallScreen } from "@/hooks/useSmallScreen";
import { ModalType, useModal } from "@/hooks/useModalStore";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const CompareHeader = () => {
  const isSmallScreen = useSmallScreen();
  const { onOpen } = useModal();

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action);
  };

  return (
    <div className="mx-8 flex items-center justify-between">
      <PageHeader
        header="Compare two groceries"
        subtext="compare and get full overview of their differences"
      />
      {isSmallScreen ? (
        <Button
          className="fixed bottom-6 right-6 z-50 h-auto rounded-full p-4 shadow-md"
          onClick={(e) => onAction(e, "adjustWeight")}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          className="p-2.5 lg:rounded-md"
          onClick={(e) => onAction(e, "adjustWeight")}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default CompareHeader;
