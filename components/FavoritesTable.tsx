"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { FoodWithCategoryWithMain } from "@/types/types";
import { useFavorites } from "@/context/FavoritesContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import FavoriteButton from "./FavoriteButton";
import StackedTextWithImage from "./StackedTextWithImage";

interface FoodTableProps {
  favorites: FoodWithCategoryWithMain[];
  onClose: () => void;
}

const FavoritesTable = ({ favorites, onClose }: FoodTableProps) => {
  const { favorites: contextFavorites } = useFavorites();
  const [sortOrder, setSortOrder] = useState("asc");

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedFavorites = contextFavorites.slice().sort((a, b) => {
    const comparison =
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    return comparison;
  });

  const MotionTableRow = motion(TableRow);

  return (
    <ScrollArea className="h-[300px]">
      {sortedFavorites.length != 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex items-center">
                <span className="mr-2">Title</span>
                <button onClick={toggleSortOrder}>
                  <ArrowUpDown size={16} />
                </button>
              </TableHead>
              <TableHead className="w-0 sm:w-full">
                <span className="hidden sm:block">Preference</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {sortedFavorites.map((favorite) => (
                <MotionTableRow
                  key={favorite.id}
                  layout
                  exit={{ y: -30, opacity: 0 }}
                >
                  <Link href={`/details/${favorite.id}`} onClick={onClose}>
                    <StackedTextWithImage
                      isCreator={favorite.isCreator}
                      imageSrc={favorite.imageUrl || ""}
                      title={favorite.title}
                      subtext={favorite.category?.name || ""}
                    />
                  </Link>

                  <TableCell>
                    {favorite.preference ? (
                      <span className="mr-1 whitespace-nowrap rounded-full border border-primary-600 px-2 py-1 text-xs text-primary-600">
                        {favorite.preference}
                      </span>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <FavoriteButton
                      item={favorite}
                      favorites={favorites}
                      foodId={favorite.id}
                      size="sm"
                    />
                  </TableCell>
                </MotionTableRow>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      )}
      {sortedFavorites.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.1 }}
          className="mt-10 h-[200px] text-center text-sm text-muted-foreground text-neutral-400"
        >
          <Image
            src="/burger.jpg"
            height={150}
            width={150}
            alt="Illustration"
            className="mx-auto"
          />
          <span>Favorites are empty</span>
        </motion.div>
      )}
    </ScrollArea>
  );
};

export default FavoritesTable;
