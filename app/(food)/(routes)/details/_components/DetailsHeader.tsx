"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { useSmallScreen } from "@/hooks/useSmallScreen";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

const DetailsHeader = () => {
  const isSmallScreen = useSmallScreen();
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between">
      <PageHeader
        header="Food Details"
        subtext="full insight into the food per 100g"
      />
      {isSmallScreen ? (
        <Button
          className="fixed bottom-6 right-6 z-50 h-auto rounded-full p-4 shadow-md"
          variant={"outline"}
          onClick={() => router.push("/")}
        >
          <Home className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          className="h-auto p-2.5 lg:rounded-md"
          variant={"outline"}
          onClick={() => router.push("/")}
        >
          <Home className="h-4 w-4" />
          <span className="ml-2">Home</span>
        </Button>
      )}
    </div>
  );
};

export default DetailsHeader;
