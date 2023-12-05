"use client";

import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { useSmallScreen } from "@/hooks/useSmallScreen";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FormHeaderProps {
  isAdmin: boolean;
  checked: boolean;
  disabled: boolean;
  onCheckedChange: () => void;
}

const FormHeader = ({
  disabled,
  checked,
  isAdmin,
  onCheckedChange,
}: FormHeaderProps) => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <PageHeader
        header="Customize Food"
        subtext="fill out as much and accurate as possible"
      />
      {isAdmin && (
        <div className="flex items-center space-x-2">
          <Switch
            id="is-creator"
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="w-md"
          />
          <Label htmlFor="is-creator">is Creator</Label>
        </div>
      )}
      {isSmallScreen ? (
        <Button
          disabled={disabled}
          className="fixed bottom-6 right-6 z-50 h-auto rounded-full p-4"
          variant={"outline"}
          onClick={() => router.push("/")}
        >
          <Home className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          disabled={disabled}
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

export default FormHeader;
