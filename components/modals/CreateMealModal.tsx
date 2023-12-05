"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useModal } from "@/hooks/useModalStore";
import { useMeal } from "@/context/MealContext";
import { useCalculator } from "@/context/CalculatorContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const CreateMealModal = () => {
  const { isOpen, onClose, type, useCase } = useModal();
  const { clearAll } = useMeal();
  const router = useRouter();
  const { initiateEntries, clearInitialEntries } = useCalculator();

  const isModalOpen = isOpen && type === "createMeal";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/meal", values);

      clearInitialEntries();
      if (useCase === "initial") {
        initiateEntries();
      }

      router.push(`/meal/${response.data.id}`);
      onClose();
      clearAll();
      router.refresh();
      form.reset();
      toast.success("Meal added");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary-800">
            Create a new meal
          </DialogTitle>
          <DialogDescription className="text-neutral-500">
            Set the stage for your Meal: provide a title and save
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold text-primary-800">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 flex items-center gap-x-2">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-primary-600 sm:ml-auto sm:w-[80px]"
              >
                {isSubmitting ? <Loader /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMealModal;
