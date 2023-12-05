"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Brush } from "lucide-react";

import { isAdmin } from "@/utils/admin";
import { formSchema } from "@/utils/formSchema";
import { WholeFoodWithCategory } from "@/types/types";

import MainNutrientsForm from "./MainNutrientsForm";
import GeneralForm from "./GeneralForm";
import MineralsForm from "./MineralsForm";
import TraceElementsForm from "./TraceElementsForm";
import VitaminsForm from "./VitaminsForm";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import IconHeader from "@/components/IconHeader";
import ImageForm from "@/components/ImageForm";
import Loader from "@/components/Loader";
import FormHeader from "./FormHeader";

interface AddEditFormProps {
  initialData: Omit<WholeFoodWithCategory, "category">;
  foodId: string;
  options: { label: string; value: string }[];
  currentUserId: string;
}

const parseValuesToNumber = (obj: { [key: string]: any }) => {
  const result = { ...obj };
  const excludedProperties = ["title", "preference", "categoryId", "isCreator"];

  for (const key in result) {
    if (result.hasOwnProperty(key) && !excludedProperties.includes(key)) {
      const value = result[key];

      // Check if the value is a string representation of a number
      if (
        typeof value === "string" &&
        !isNaN(Number(value.replace(",", ".")))
      ) {
        if (value === "0" || value === "0.0") {
          result[key] = 0;
        } else {
          result[key] = parseFloat(value.replace(",", ".")) || null;
        }
      }
    }
  }

  return result;
};

const AddEditForm = ({
  initialData,
  foodId,
  options,
  currentUserId,
}: AddEditFormProps) => {
  const [isFoodCreator, setIsFoodCreator] = useState<boolean>(
    initialData.isCreator,
  );
  const router = useRouter();

  // flatten food object to fit to defaultValues
  const flattenedInitialData = {
    ...initialData,
    ...(initialData.mainNutrients && initialData.mainNutrients[0]
      ? initialData.mainNutrients[0]
      : {}),
    ...(initialData.minerals && initialData.minerals[0]
      ? initialData.minerals[0]
      : {}),
    ...(initialData.traceElements && initialData.traceElements[0]
      ? initialData.traceElements[0]
      : {}),
    ...(initialData.vitamins && initialData.vitamins[0]
      ? initialData.vitamins[0]
      : {}),
  };

  delete flattenedInitialData.mainNutrients;
  delete flattenedInitialData.minerals;
  delete flattenedInitialData.traceElements;
  delete flattenedInitialData.vitamins;

  const requiredFields = [
    initialData.title,
    initialData.categoryId,
    initialData?.mainNutrients?.[0]?.calories,
    initialData?.mainNutrients?.[0]?.fats,
    initialData?.mainNutrients?.[0]?.proteins,
    initialData?.mainNutrients?.[0]?.carbohydrates,
    initialData?.mainNutrients?.[0]?.sugar,
    initialData?.mainNutrients?.[0]?.fiber,
    initialData?.mainNutrients?.[0]?.salt,
    initialData?.mainNutrients?.[0]?.water,
  ];

  // const isCompletedFields = requiredFields.every(Boolean);
  const isCompletedFields = requiredFields.every(
    (value) => value !== null && value !== undefined,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: flattenedInitialData,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const parsedValues = parseValuesToNumber(values);

    parsedValues.isCreator = isFoodCreator;

    try {
      await axios.patch(`/api/food/${foodId}`, parsedValues);
      toast.success("Food updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <FormHeader
        checked={isFoodCreator}
        disabled={!isCompletedFields || isSubmitting}
        isAdmin={isAdmin(currentUserId)}
        onCheckedChange={() => setIsFoodCreator((c) => !c)}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-16 grid grid-cols-1 gap-6 gap-y-8 md:grid-cols-2">
            <div className="-mb-4 md:col-span-2">
              <IconHeader
                icon={Brush}
                title="Customize your Food"
                size={"md"}
              />
            </div>
            <GeneralForm
              initialData={initialData}
              form={form}
              isSubmitting={isSubmitting}
              options={options}
            />

            <ImageForm
              initialData={initialData}
              endpoint={`/api/food/${initialData.id}`}
              label="Food"
            />
            <MainNutrientsForm form={form} isSubmitting={isSubmitting} />
            <MineralsForm form={form} isSubmitting={isSubmitting} />
            <TraceElementsForm form={form} isSubmitting={isSubmitting} />
            <VitaminsForm form={form} isSubmitting={isSubmitting} />

            <div className="my-6 flex items-center gap-x-2 md:col-span-2 md:ml-auto">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-primary-800 md:float-right md:w-[80px]"
              >
                {isSubmitting ? <Loader /> : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddEditForm;
