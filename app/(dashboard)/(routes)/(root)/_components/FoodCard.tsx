"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ImageIcon, User } from "lucide-react";

import { FoodWithCategoryWithMain } from "@/types/types";

import IconBadge from "@/components/IconBadge";
import FavoriteButton from "@/components/FavoriteButton";

interface FoodCardProps {
  id: string;
  item: FoodWithCategoryWithMain;
  favorites: FoodWithCategoryWithMain[];
  currentUserId: string | undefined;
}

const FoodCard = ({ id, item, favorites, currentUserId }: FoodCardProps) => {
  const isImage = Boolean(item.imageUrl);

  let backgroundColorClass = "";
  let borderColorClass = "";

  // necessary because the class names from tailwind are generated during the build process
  // and cannot be dynamically generated at runtime.

  switch (item.category?.name) {
    case "Grains":
      backgroundColorClass = "bg-category-grains";
      borderColorClass = "border-category-grains";
      break;
    case "Vegetables":
      backgroundColorClass = "bg-category-vegetables";
      borderColorClass = "border-category-vegetables";
      break;
    case "Legumes":
      backgroundColorClass = "bg-category-legumes";
      borderColorClass = "border-category-legumes";
      break;
    case "Nuts & Seeds":
      backgroundColorClass = "bg-category-nuts_seeds";
      borderColorClass = "border-category-nuts_seeds";
      break;
    case "Oils & Fats":
      backgroundColorClass = "bg-category-oils_fats";
      borderColorClass = "border-category-oils_fats";
      break;
    case "Herbs":
      backgroundColorClass = "bg-category-herbs";
      borderColorClass = "border-category-herbs";
      break;
    case "Beverages":
      backgroundColorClass = "bg-category-beverages";
      borderColorClass = "border-category-beverages";
      break;
    case "Dairy":
      backgroundColorClass = "bg-category-dairy";
      borderColorClass = "border-category-dairy";
      break;
    case "Fruits":
      backgroundColorClass = "bg-category-fruits";
      borderColorClass = "border-category-fruits";
      break;
    default:
      break;
  }

  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/details/${id}`}>
        <div
          className={`flex flex-col gap-4 border-b-2 ${borderColorClass} relative overflow-hidden rounded-xl bg-primary-50 p-4 shadow-md`}
        >
          <div
            className={`absolute h-10 w-32 ${backgroundColorClass} -right-3 -top-6 rotate-12`}
          ></div>
          {currentUserId && (
            <div className="absolute right-[5px] top-[5px]">
              <FavoriteButton foodId={id} item={item} favorites={favorites} />
            </div>
          )}
          {!item.isCreator && (
            <IconBadge
              icon={User}
              size="sm"
              className="absolute left-1 top-1"
            />
          )}
          <div className="mx-auto flex max-w-[210px] items-center justify-center gap-4">
            {/* Image */}
            <div
              className={`flex h-[95px] w-[95px] flex-shrink-0 items-center justify-center border-[3.5px] ${borderColorClass} overflow-hidden rounded-full`}
            >
              {isImage && (
                <Image
                  width={30}
                  height={30}
                  className="h-full w-full object-cover"
                  alt={item.title}
                  src={item.imageUrl || ""}
                />
              )}
              {!isImage && <ImageIcon className="text-neutral-400" size={30} />}
            </div>
            <div className="flex flex-col truncate text-neutral-700">
              <span className="truncate text-lg font-bold">{item.title}</span>
              <span
                className={`w-max border-[2px] ${borderColorClass} rounded-full px-2 text-xs font-medium`}
              >
                {item.category?.name}
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="flex justify-center gap-3 text-sm text-neutral-600">
            <div className="flex flex-col">
              <span>Calories</span>
              <span>Proteins</span>
              <span>Carbohydrates</span>
              <span>Fats</span>
              <span>Fiber</span>
            </div>
            <div className="w-[3px] bg-slate-200"></div>
            <div className="flex flex-col truncate">
              <span className="truncate">
                {item.mainNutrients?.[0]?.calories?.toFixed(1)}
              </span>
              <span className="truncate">
                {item.mainNutrients?.[0]?.proteins?.toFixed(1)}
              </span>
              <span className="truncate">
                {item.mainNutrients?.[0]?.carbohydrates?.toFixed(1)}
              </span>
              <span className="truncate">
                {item.mainNutrients?.[0]?.fats?.toFixed(1)}
              </span>
              <span className="truncate">
                {item.mainNutrients?.[0]?.fiber?.toFixed(1)}
              </span>
            </div>
            <div className="w-[3px] bg-slate-200"></div>
            <div className="flex flex-col">
              <span>kcal</span>
              <span>g</span>
              <span>mg</span>
              <span>g</span>
              <span>g</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FoodCard;
