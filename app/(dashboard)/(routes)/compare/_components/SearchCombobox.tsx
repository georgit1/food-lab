import { Category, Food } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { Check, ChevronsUpDown, ImageIcon } from "lucide-react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { WholeFoodWithCategory } from "@/types/types";
import { useDebounce } from "@/hooks/useDebounce";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type FoodWithCategory = Food & { category: Category };

interface SearchComboboxProps {
  favorites: FoodWithCategory[];
  foodData: WholeFoodWithCategory[];
  identifier: string;
  className?: string;
  onFoodSelection: (food: FoodWithCategory | null, identifier: string) => void;
}

const SearchCombobox = ({
  favorites,
  foodData,
  identifier,
  className,
  onFoodSelection,
}: SearchComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodOptions, setFoodOptions] = useState<WholeFoodWithCategory[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const fetchFoodOptions = async (event: FormEvent<HTMLInputElement>) => {
    const inuputElement = event.target as HTMLInputElement;

    setSearchTerm(inuputElement.value);

    if (inuputElement.value === "") setFoodOptions([]);
  };

  const excludedFavorites = foodData.filter(
    (foodItem) => !favorites.some((favorite) => favorite.id === foodItem.id),
  );

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const { data: fetchedFoodOptions } = await axios.get("/api/food", {
          params: { searchTerm: debouncedSearchTerm },
        });

        // exclude favorites
        const excludedFavorites = fetchedFoodOptions?.filter(
          (foodItem: WholeFoodWithCategory) =>
            !favorites.some((favorite) => favorite.id === foodItem.id),
        );

        setFoodOptions(excludedFavorites);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching food options:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchTerm) {
      fetchOptions();
    }
  }, [debouncedSearchTerm, favorites]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={`${className}`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[200px] justify-between"
        >
          {value ? (
            <span className="truncate text-neutral-500">
              {/* if not found in foodData search in foodOptions or favorites */}
              {
                (
                  foodData.find(
                    (item) => item.title.toLocaleLowerCase() === value,
                  ) ||
                  foodOptions.find(
                    (item) => item.title.toLocaleLowerCase() === value,
                  ) ||
                  favorites.find(
                    (item) => item.title.toLocaleLowerCase() === value,
                  )
                )?.title
              }
            </span>
          ) : (
            <span className="text-neutral-500">Select food...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchTerm}
            placeholder="Search food..."
            onChangeCapture={(e) => {
              onFoodSelection(null, identifier);
              fetchFoodOptions(e);
            }}
          />
          <CommandEmpty className="flex h-16 items-center justify-center text-sm text-neutral-500">
            {isLoading ? (
              <Loader twColor="black/60" className="" />
            ) : (
              "No food found."
            )}
          </CommandEmpty>
          {favorites.length !== 0 && (
            <CommandGroup heading="Favorites">
              {favorites?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={(currentValue) => {
                    onFoodSelection(
                      value === item.title.toLowerCase() ? null : item,
                      identifier,
                    );
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.title.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <div className="flex items-center gap-2.5">
                    <Avatar className="flex h-5 w-5 items-center justify-center ring-2 ring-offset-2">
                      {item.imageUrl ? (
                        <AvatarImage src={item.imageUrl} />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-neutral-400" />
                      )}
                    </Avatar>
                    <span className="w-full max-w-[120px] truncate text-sm text-neutral-800">
                      {item.title}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Selection">
            {(foodOptions.length !== 0 ? foodOptions : excludedFavorites)?.map(
              (item) => (
                <CommandItem
                  key={item.id}
                  value={item.title}
                  onSelect={(currentValue) => {
                    onFoodSelection(
                      value === item.title.toLowerCase() ? null : item,
                      identifier,
                    );
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.title.toLowerCase()
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  <div className="flex items-center gap-2.5">
                    <Avatar className="flex h-5 w-5 items-center justify-center ring-2 ring-offset-2">
                      {item.imageUrl ? (
                        <AvatarImage src={item.imageUrl} />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-neutral-400" />
                      )}
                    </Avatar>
                    <span className="w-full max-w-[120px] truncate text-sm text-neutral-800">
                      {item.title}
                    </span>
                  </div>
                </CommandItem>
              ),
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchCombobox;
