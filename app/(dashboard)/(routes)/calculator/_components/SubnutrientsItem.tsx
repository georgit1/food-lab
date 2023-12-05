import { Ref, useRef } from "react";

import {
  MineralItemsType,
  TraceElementItemsType,
  VitaminItemsType,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from "@/constants/nutrients";
import { NutrientData } from "@/utils/calcPersonalNutrients";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NutrientsBarChart from "./NutrientsBarChart";
import NutrientsTable from "./NutrientsTable";

interface NutrientIndex {
  [key: string]: number | null;
}

interface SubNutrientsItemProps {
  minerals: MineralItemsType & NutrientIndex;
  traceElements: TraceElementItemsType & NutrientIndex;
  vitamins: VitaminItemsType & NutrientIndex;
  requiredNutrients: NutrientData;
}

const SubnutrientsItem = ({
  minerals,
  traceElements,
  vitamins,
  requiredNutrients,
}: SubNutrientsItemProps) => {
  // close tooltip (Attention) on scroll
  const tooltipRef = useRef<HTMLDivElement>(null);

  const allMineralsUndefined = mineralItems.every(
    (mineral) => minerals?.[mineral] === undefined,
  );
  const allTraceElementsUndefined = traceElementItems.every(
    (traceElement) => traceElements?.[traceElement] === undefined,
  );
  const allVitaminsUndefined = vitaminItems.every(
    (vitamin) => vitamins?.[vitamin] === undefined,
  );

  return (
    <div className="xs:mx-0 -mx-5 mb-6 min-h-[280px] overflow-hidden rounded-md bg-primary-50 p-2 lg:col-span-2">
      <Tabs defaultValue="minerals">
        <TabsList>
          <TabsTrigger value="minerals">Minerals</TabsTrigger>
          <TabsTrigger value="traceElements">Trace Elements</TabsTrigger>
          <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
        </TabsList>
        <TabsContent value="minerals">
          {!allMineralsUndefined ? (
            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <ScrollArea
                onScrollCapture={() => tooltipRef?.current?.remove()}
                className="h-[300px] w-full border-primary-100 pr-4 lg:border-r-2"
              >
                <NutrientsTable
                  nutrients={minerals}
                  nutrientsItems={mineralItems}
                  requiredNutrients={requiredNutrients}
                  ref={tooltipRef as Ref<HTMLDivElement>}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={minerals}
                nutrientsItems={mineralItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className="mt-16 text-center text-sm font-semibold text-neutral-400">
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value="traceElements">
          {!allTraceElementsUndefined ? (
            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <ScrollArea
                onScrollCapture={() => tooltipRef?.current?.remove()}
                className="h-[300px] w-full border-primary-100 pr-4 lg:border-r-2"
              >
                <NutrientsTable
                  nutrients={traceElements}
                  nutrientsItems={traceElementItems}
                  requiredNutrients={requiredNutrients}
                  ref={tooltipRef as Ref<HTMLDivElement>}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={traceElements}
                nutrientsItems={traceElementItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className="mt-16 text-center text-sm font-semibold text-neutral-400">
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value="vitamins">
          {!allVitaminsUndefined ? (
            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <ScrollArea
                onScrollCapture={() => tooltipRef?.current?.remove()}
                className="h-[300px] w-full border-primary-100 pr-4 lg:border-r-2"
              >
                <NutrientsTable
                  nutrients={vitamins}
                  nutrientsItems={vitaminItems}
                  requiredNutrients={requiredNutrients}
                  ref={tooltipRef as Ref<HTMLDivElement>}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={vitamins}
                nutrientsItems={vitaminItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className="mt-16 text-center text-sm font-semibold text-neutral-400">
              no data available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubnutrientsItem;
