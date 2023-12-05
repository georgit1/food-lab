import { Mineral, TraceElement, Vitamin } from "@prisma/client";

import {
  mineralItems,
  traceElementItems,
  vitaminItems,
} from "@/constants/nutrients";
import { NutrientData } from "@/utils/calcPersonalNutrients";

import NutrientsBarChart from "./NutrientsBarChart";
import NutrientsTable from "./NutrientsTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NutrientIndex {
  [key: string]: number | null;
}

interface SubNutrientsItemProps {
  minerals: Mineral & NutrientIndex;
  traceElements: TraceElement & NutrientIndex;
  vitamins: Vitamin & NutrientIndex;
  requiredNutrients: NutrientData;
}

const SubNutrientsItem = ({
  minerals,
  traceElements,
  vitamins,
  requiredNutrients,
}: SubNutrientsItemProps) => {
  const allMineralsNull = mineralItems.every(
    (mineral) => minerals[mineral] === null,
  );
  const allTraceElementsNull = traceElementItems.every(
    (traceElement) => traceElements[traceElement] === null,
  );
  const allVitaminsNull = vitaminItems.every(
    (vitamin) => vitamins[vitamin] === null,
  );

  return (
    <div className="order-6 col-span-3 row-span-3 mb-6 min-h-[280px] overflow-hidden rounded-md bg-primary-50 p-2 lg:order-3">
      <Tabs defaultValue="minerals">
        <TabsList className="w-full">
          <TabsTrigger value="minerals">Minerals</TabsTrigger>
          <TabsTrigger value="traceElements">Trace Elements</TabsTrigger>
          <TabsTrigger value="vitamins">Vitamins</TabsTrigger>
        </TabsList>
        <TabsContent value="minerals">
          {!allMineralsNull ? (
            <>
              <NutrientsBarChart
                nutrients={minerals}
                nutrientsItems={mineralItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
              <ScrollArea className="h-[300px]">
                <NutrientsTable
                  nutrients={minerals}
                  nutrientsItems={mineralItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
            </>
          ) : (
            <p className="mt-16 text-center text-sm font-semibold text-neutral-600 lg:mt-56">
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value="traceElements">
          {!allTraceElementsNull ? (
            <>
              <NutrientsBarChart
                nutrients={traceElements}
                nutrientsItems={traceElementItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
              <ScrollArea className="h-[300px]">
                <NutrientsTable
                  nutrients={traceElements}
                  nutrientsItems={traceElementItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
            </>
          ) : (
            <p className="text-center text-sm font-semibold text-neutral-600 lg:mt-56">
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value="vitamins">
          {!allVitaminsNull ? (
            <>
              <NutrientsBarChart
                nutrients={vitamins}
                nutrientsItems={vitaminItems}
                targetUnit="mg"
                requiredNutrients={requiredNutrients}
              />
              <ScrollArea className="h-[300px]">
                <NutrientsTable
                  nutrients={vitamins}
                  nutrientsItems={vitaminItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
            </>
          ) : (
            <p className="text-center text-sm font-semibold text-neutral-600 lg:mt-56">
              no data available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubNutrientsItem;
