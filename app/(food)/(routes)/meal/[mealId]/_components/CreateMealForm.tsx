"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Meal } from "@prisma/client";

import { useMeal } from "@/context/MealContext";
import { ModalType, useModal } from "@/hooks/useModalStore";
import { useCalculator } from "@/context/CalculatorContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageForm from "@/components/ImageForm";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CreateMealProps {
  initialData: Meal;
  mealId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().nullable(),
});

const CreateMealForm = ({ initialData, mealId }: CreateMealProps) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const { mealEntries } = useMeal();
  const { clearInitialEntries } = useCalculator();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (mealEntries.length < 2)
      return toast.error("at least two items required");

    const data = { ...values, mealItems: mealEntries };

    try {
      await axios.patch(`/api/meal/${mealId}`, data);
      toast.success("Meal updated");
      clearInitialEntries();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { title: initialData.title, mealId });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <ImageForm
          initialData={initialData}
          endpoint={`/api/meal/${initialData.id}`}
          label="Meal"
        />
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-primary-600">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  type="string"
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
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-primary-600">
                Description (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="e.g. 'This meal contains...'"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="w-full md:ml-auto"
        >
          Save
        </Button>
        <Button
          type="button"
          className="w-full border-red-700 text-red-700 md:ml-auto"
          variant={"outline"}
          onClick={(e) => onAction(e, "deleteMeal")}
        >
          delete Meal
        </Button>
      </form>
    </Form>
  );
};

export default CreateMealForm;
