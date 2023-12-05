import React from "react";
import { Crown, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSmallScreen } from "@/hooks/useSmallScreen";

import IconBadge from "@/components/IconBadge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  imageSrc: string;
  title: string;
  category: string;
  variant?: "left" | "right";
  winner?: boolean;
}

const Header = ({
  imageSrc,
  title,
  category,
  variant,
  winner = false,
}: HeaderProps) => {
  const isSmallScreen = useSmallScreen();

  const sideByVariant = {
    left: "flex items-center justify-center",
    right: "flex flex-row-reverse justify-center items-center text-end",
  };

  return (
    <div className={cn("mt-2", sideByVariant[variant || "left"])}>
      <div className="mr-1.5">
        <Avatar
          className={`m-3 flex items-center justify-center ring-2 ring-primary-800 ring-offset-2 ${
            isSmallScreen ? "h-12 w-12" : "h-14 w-14"
          } `}
        >
          {imageSrc ? (
            <AvatarImage src={imageSrc} />
          ) : (
            <ImageIcon className="text-neutral-400" />
          )}
        </Avatar>
      </div>
      <div className="truncate">
        <h2 className="text-md flex items-center gap-1 font-semibold text-primary-800">
          <span className="max-w-[200px] truncate">{title || "[Title]"}</span>
          {winner && <IconBadge variant={"success"} icon={Crown} size={"xs"} />}
        </h2>
        <p className="truncate text-xs text-neutral-500">
          {category || "[category]"}
        </p>
      </div>
    </div>
  );
};

export default Header;
