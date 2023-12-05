"use client";

import { Ref, forwardRef } from "react";
import { AlertTriangle } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AttentionProps {
  title: string;
  missingItems: string[];
}

const Attention = forwardRef(function Attention(
  props: AttentionProps,
  tooltipRef: Ref<HTMLDivElement>,
) {
  const { title, missingItems } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <AlertTriangle size={15} className="cursor-pointer text-[#B90000]" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="w-full max-w-[280px]"
        ref={tooltipRef}
      >
        <p className="px-1 text-xs font-semibold">{`${title} is missing in: ${missingItems?.join(
          ", ",
        )}`}</p>
      </PopoverContent>
    </Popover>
  );
});

export default Attention;
