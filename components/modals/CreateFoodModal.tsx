"use client";

import axios from "axios";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useMeal } from "@/context/MealContext";
import { useModal } from "@/hooks/useModalStore";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  categoryId: z.string().min(1, { message: "Please select a category" }),
});

const CreateFoodModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { clearAll } = useMeal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "createFood";
  const { options } = data;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", categoryId: "" },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/food", values);
      router.push(`/manage/${response.data.id}`);
      onClose();
      clearAll();
      router.refresh();
      form.reset();
      toast.success("Food added");
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
          <DialogTitle className="text-primary-800">Add a new food</DialogTitle>
          <DialogDescription className="text-neutral-500">
            Add a title, choose a category, and save to get started
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className=" mt-3 w-full">
                  <FormLabel className="font-semibold text-primary-800">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default CreateFoodModal;
