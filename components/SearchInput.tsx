"use client";

import qs from "query-string";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";

import { Input } from "./ui/input";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 z-10 h-4 w-4 text-neutral-600" />
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full rounded-full bg-neutral-100 pl-9 focus-visible:ring-neutral-200 md:w-[300px]"
        placeholder="Search for a food"
      />
    </div>
  );
};

export default SearchInput;
