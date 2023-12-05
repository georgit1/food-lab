"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  variant?: "default" | "ghost";
  className?: string;
  onLogout?: () => void;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  variant = "default",
  className,
  onLogout,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const handleRoute = () => {
    router.push(href || "");
  };

  return (
    <button
      onClick={onLogout ? onLogout : handleRoute}
      type="button"
      className={cn(
        `mb-1 flex w-full items-center gap-x-2 rounded-md pl-6 text-sm font-[500] text-slate-500 transition-all ${
          variant === "default"
            ? "hover:bg-slate-300/20 hover:text-slate-600"
            : ""
        } ${className}`,
        isActive &&
          variant === "default" &&
          "bg-sky-200/20 text-sky-700 hover:bg-sky-200/20 hover:text-sky-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
    </button>
  );
};
