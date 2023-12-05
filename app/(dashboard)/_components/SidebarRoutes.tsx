"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Compass,
  UserCircle,
  LogIn,
  LogOut,
  Calculator,
  Banana,
  Salad,
  GitCompare,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarItem } from "./SidebarItem";
import AccordionButton from "./AccordionButton";

interface SidebarRoutesProps {
  currentUser: User | null;
}

const browseRoutes = [
  {
    icon: Banana,
    label: "Food",
    href: "/",
  },
  {
    icon: Salad,
    label: "Meals",
    href: "/meals",
  },
];

const routes = [
  {
    icon: Calculator,
    label: "Meal Calculator",
    href: "/calculator",
  },
  {
    icon: GitCompare,
    label: "Compare Food",
    href: "/compare",
  },
  {
    icon: UserCircle,
    label: "User Profile",
    href: "/profile",
  },
];

const loginRoute = {
  icon: LogIn,
  label: "Login",
  href: "/sign-in",
};

const logoutRoute = {
  icon: LogOut,
  label: "Logout",
};

export const SidebarRoutes = ({ currentUser }: SidebarRoutesProps) => {
  const [isExpanded, setExpanded] = useState(false);
  const pathname = usePathname();

  const isBrowseActive = pathname === "/" || pathname === "/meals";

  const handleExpand = () => {
    setExpanded((exp) => !exp);
  };

  return (
    <>
      {/* Browse accordion */}
      <Accordion type="single" collapsible>
        <AccordionItem value="food" className="border-none">
          <AccordionTrigger
            onClick={handleExpand}
            className={cn(
              "mb-1 rounded-md p-0 pr-2 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
              isBrowseActive && !isExpanded && "bg-sky-500/10 text-sky-700",
            )}
          >
            <span className="flex items-center gap-x-2 py-4 pl-6">
              <Compass
                size={22}
                className={cn(
                  "text-slate-500",
                  isBrowseActive && "text-sky-700",
                )}
              />
              Browse
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-2 pb-0 text-neutral-700">
            {browseRoutes.map((route) => (
              <AccordionButton
                key={route.href}
                href={route.href}
                label={route.label}
                icon={route.icon}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* routes */}
      <div className="flex w-full flex-col">
        {routes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>

      {/* Login/Logout */}
      {currentUser?.id ? (
        <SidebarItem
          key={logoutRoute.label}
          icon={logoutRoute.icon}
          label={logoutRoute.label}
          variant="ghost"
          onLogout={() => signOut()}
          className="mt-auto"
        />
      ) : (
        <SidebarItem
          key={loginRoute.href}
          icon={loginRoute.icon}
          label={loginRoute.label}
          href={loginRoute.href}
          variant="ghost"
          className="mt-auto"
        />
      )}
    </>
  );
};
