"use client";

import { AnimatePresence, motion } from "framer-motion";

import { FoodWithCategoryWithMain } from "@/types/types";

import FoodCard from "./FoodCard";

interface FoodListProps {
  items: FoodWithCategoryWithMain[];
  favorites: FoodWithCategoryWithMain[];
  currentUserId: string | undefined;
}

const FoodList = ({ items, favorites, currentUserId }: FoodListProps) => {
  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
        <AnimatePresence>
          {items.map((item) => (
            <FoodCard
              key={item.id}
              id={item.id}
              item={item}
              favorites={favorites}
              currentUserId={currentUserId}
            />
          ))}
        </AnimatePresence>
      </div>
      {items.length === 0 && (
        <motion.div
          className="mt-10 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.1 }}
        >
          No Food found
        </motion.div>
      )}
    </div>
  );
};

export default FoodList;
