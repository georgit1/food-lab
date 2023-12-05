"use client";

import { useState } from "react";
import { Apple, ChevronDown, ChevronUp } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IconBadge from "@/components/IconBadge";
import IconHeader from "@/components/IconHeader";

interface GeneralFormProps {
  form: any;
  isSubmitting: boolean;
}

const MainNutrientsForm = ({ form, isSubmitting }: GeneralFormProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleShowDetails = () => {
    setShowDetails((d) => !d);
  };

  return (
    <div>
      <IconHeader icon={Apple} title="Main Nutrients" size={"md"} />

      <div className="mt-5 rounded-md border bg-primary-50 p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Calories
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter calories"
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
            name="fats"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Fats
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter fats"
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
            name="proteins"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Proteins
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter proteins"
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
            name="carbohydrates"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Carbohydrates
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter carbohydrates"
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
            name="sugar"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Sugar
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter sugar"
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
            name="fiber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Fiber
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter fiber"
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
            name="salt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Salt
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter salt"
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
            name="water"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-semibold text-primary-800">
                  Water
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    unit="g"
                    disabled={isSubmitting}
                    placeholder="Enter water"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showDetails && (
            <>
              <FormField
                control={form.control}
                name="saturated"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-primary-800">
                      Saturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        unit="g"
                        disabled={isSubmitting}
                        placeholder="Enter saturated fats"
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
                name="monounsaturated"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-primary-800">
                      Monounsaturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        unit="g"
                        disabled={isSubmitting}
                        placeholder="Enter monounsaturated fats"
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
                name="polyunsaturated"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-semibold text-primary-800">
                      Polyunsaturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        unit="g"
                        disabled={isSubmitting}
                        placeholder="Enter polyunsaturated fats"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Uncollapse details */}
        <div className="col-span-2 mt-4 flex">
          <div className="mx-auto flex flex-col content-center gap-1">
            <span className="mx-auto text-xs font-semibold text-primary-600">
              {showDetails ? "close" : "more details"}
            </span>
            <span className="mx-auto" onClick={toggleShowDetails}>
              <IconBadge
                icon={showDetails ? ChevronUp : ChevronDown}
                size="sm"
                className="cursor-pointer"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNutrientsForm;
