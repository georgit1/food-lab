"use client";

import { useRouter } from "next/navigation";
import { Edit, Lock, MoreVertical, Trash, User } from "lucide-react";

import { isAdmin } from "@/utils/admin";
import { ModalType, useModal } from "@/hooks/useModalStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconBadge from "@/components/IconBadge";
import Carousel from "./Carousel";

interface GeneralItemProps {
  foodId: string;
  currentUserId: string;
  foodCreator: string;
  title: string;
  category: string;
  imageUrl: string;
  preference: string | null;
  isCreator: boolean;
}

const GeneralItem = ({
  foodId,
  currentUserId,
  foodCreator,
  title,
  category,
  imageUrl,
  preference,
  isCreator,
}: GeneralItemProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const onClick = () => {
    router.push(`/manage/${foodId}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { title, foodId });
  };

  return (
    <div className="relative order-1 col-span-3 overflow-hidden rounded-md bg-primary-50 p-2 sm:col-span-1">
      <div className="flex flex-col">
        <span className="flex items-center gap-1.5">
          <h3 className="truncate text-xl font-bold text-primary-800 lg:max-w-[110px] xl:max-w-[155px]">
            {title}
          </h3>
          {!isCreator && currentUserId && <IconBadge icon={User} size={"sm"} />}
        </span>
        <span className="text-sm font-semibold text-primary-500">
          {category}
        </span>
      </div>
      {/* Menu Button */}
      {isAdmin(currentUserId) || currentUserId === foodCreator ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="absolute right-1 top-2 rounded-full bg-primary-50 p-1 transition hover:bg-primary-100">
              <MoreVertical
                size={20}
                className="hover cursor-pointer text-primary-600"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuItem
              onClick={onClick}
              className="cursor-pointer text-primary-800"
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => onAction(e, "deleteFood")}
              className="cursor-pointer text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Lock
          className="absolute right-2 top-3 bg-primary-50 text-neutral-400"
          size={18}
        />
      )}
      <div className="relative mt-8 h-40 w-full">
        <Carousel imageUrl={imageUrl} preference={preference} />
      </div>
    </div>
  );
};

export default GeneralItem;
