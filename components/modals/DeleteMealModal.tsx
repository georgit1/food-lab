"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/useModalStore";
import { useCalculator } from "@/context/CalculatorContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";

const DeleteMealModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { deleteMealEntry, clearInitialEntries } = useCalculator();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteMeal";
  const { mealId, title } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/meal/${mealId}`);
      toast.success("Meal deleted");
      clearInitialEntries();
      deleteMealEntry(mealId || "");
      onClose();
      router.refresh();
      router.push("/meals");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold text-primary-800">
            Delete Meal
          </DialogTitle>
          <DialogDescription className="text-center text-neutral-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-primary-600">
              #{title}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} className="w-[85px]">
              {isLoading ? <Loader /> : "Confirm"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMealModal;
