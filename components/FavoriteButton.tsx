"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FoodWithCategoryWithMain } from "@/types/types";
import { useFavorites } from "@/context/FavoritesContext";

const backgroundVariants = cva(
  "w-max cursor-pointer bg-primary-100 rounded-full flex justify-center items-center transition duration-300",
  {
    variants: {
      size: {
        default: "p-1.5",
        sm: "p-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const iconVariants = cva("text-primary-600 hover:scale-110 transition", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface FavoriteButtonProps
  extends BackgroundVariantsProps,
    IconVariantsProps {
  foodId: string;
  item: FoodWithCategoryWithMain;
  className?: string;
  favorites: FoodWithCategoryWithMain[];
}

const FavoriteButton = ({
  foodId,
  favorites,
  item,
  size,
  className,
}: FavoriteButtonProps) => {
  const router = useRouter();
  const {
    favorites: favoritesCtx,
    addFavorite,
    removeFavorite,
    revalidateFavorites,
  } = useFavorites();

  const favoriteIdsCtx = favoritesCtx.map((favorite) => favorite.id);

  const isFavorite = useMemo(() => {
    return favoriteIdsCtx?.includes(foodId);
  }, [foodId, favoriteIdsCtx]);

  const toggleFavorites = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();

      try {
        if (isFavorite) {
          removeFavorite(item.id);
          await axios.delete("/api/food/favorite", { data: { foodId } });
          router.refresh();
          toast.success("unfavorited");
        } else {
          addFavorite(item);
          await axios.post("/api/food/favorite", { foodId });
          router.refresh();
          toast.success("favorited");
        }
      } catch {
        toast.error("Something went wrong");

        // roll back 'optimistic update' through context on error
        revalidateFavorites(favorites);
      }
    },
    [
      foodId,
      isFavorite,
      router,
      addFavorite,
      removeFavorite,
      item,
      favorites,
      revalidateFavorites,
    ],
  );

  return (
    <div
      onClick={(e) => toggleFavorites(e)}
      className={cn("float-right", backgroundVariants({ size, className }))}
    >
      <Heart
        className={cn(iconVariants({ size }))}
        fill={isFavorite ? "#0284c7" : "transparent"}
      />
    </div>
  );
};

export default FavoriteButton;
