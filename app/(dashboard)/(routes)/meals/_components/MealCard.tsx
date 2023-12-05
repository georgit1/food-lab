import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { useMeal } from "@/context/MealContext";

interface MealCardProps {
  id: string;
  title: string;
  imageUrl: string | null;
  foodTitles: string[];
}

const MealCard = ({ id, title, imageUrl, foodTitles }: MealCardProps) => {
  const isImage = Boolean(imageUrl);
  const { clearAll } = useMeal();

  return (
    <Link href={`/meal/${id}`} onClick={() => clearAll()}>
      <div className="rounded-xl border-b-2 border-neutral-800 bg-primary-50 p-4 shadow-md">
        <div className="flex items-center justify-start gap-4">
          <div className="flex h-[90px] w-[90px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[3.5px] border-neutral-800">
            {isImage && (
              <Image
                width={30}
                height={30}
                className="h-full w-full object-cover"
                alt={title}
                src={imageUrl || ""}
              />
            )}
            {!isImage && <ImageIcon className="text-neutral-400" size={30} />}
          </div>
          <div className="flex flex-col gap-0.5 truncate text-slate-900">
            <span className="truncate text-lg font-bold">{title}</span>
            <span className="max-w-fit rounded-full bg-yellow-300 px-2 text-xs text-neutral-700">
              Meal
            </span>
            <span className="truncate text-xs">{foodTitles.join(", ")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
