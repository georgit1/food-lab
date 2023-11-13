import {
  MineralItemsType,
  TraceElementItemsType,
  VitaminItemsType,
  mineralItems,
  traceElementItems,
  vitaminItems,
} from '@/constants/nutrients';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NutrientsBarChart from './NutrientsBarChart';
import NutrientsTable from './NutrientsTable';
import { Separator } from '@/components/ui/separator';

interface NutrientData {
  [key: string]: number | null;
}

interface SubNutrientsItemProps {
  minerals: MineralItemsType & NutrientData;
  traceElements: TraceElementItemsType & NutrientData;
  vitamins: VitaminItemsType & NutrientData;
  requiredNutrients: Record<string, number>;
}

const SubnutrientsItem = ({
  minerals,
  traceElements,
  vitamins,
  requiredNutrients,
}: SubNutrientsItemProps) => {
  const allMineralsUndefined = mineralItems.every(
    (mineral) => minerals?.[mineral] === undefined
  );
  const allTraceElementsUndefined = traceElementItems.every(
    (traceElement) => traceElements?.[traceElement] === undefined
  );
  const allVitaminsUndefined = vitaminItems.every(
    (vitamin) => vitamins?.[vitamin] === undefined
  );

  return (
    <div className='lg:col-span-2 bg-primary-50 rounded-md p-2 mb-6 overflow-hidden'>
      <Tabs defaultValue='minerals'>
        <TabsList>
          <TabsTrigger value='minerals'>Minerals</TabsTrigger>
          <TabsTrigger value='traceElements'>Trace Elements</TabsTrigger>
          <TabsTrigger value='vitamins'>Vitamins</TabsTrigger>
        </TabsList>
        <TabsContent value='minerals'>
          {!allMineralsUndefined ? (
            <div className='flex flex-col-reverse lg:flex-row gap-4'>
              <ScrollArea className='h-[300px] w-full lg:border-r-2 border-primary-100 pr-4'>
                <NutrientsTable
                  nutrients={minerals}
                  nutrientsItems={mineralItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={minerals}
                nutrientsItems={mineralItems}
                targetUnit='mg'
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className='text-sm text-neutral-600 font-semibold text-center lg:mt-56'>
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value='traceElements'>
          {!allTraceElementsUndefined ? (
            <div className='flex flex-col-reverse lg:flex-row gap-4'>
              <ScrollArea className='h-[300px] w-full lg:border-r-2 border-primary-100 pr-4'>
                <NutrientsTable
                  nutrients={traceElements}
                  nutrientsItems={traceElementItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={traceElements}
                nutrientsItems={traceElementItems}
                targetUnit='mg'
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className='text-sm text-neutral-600 font-semibold text-center lg:mt-56'>
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value='vitamins'>
          {!allVitaminsUndefined ? (
            <div className='flex flex-col-reverse lg:flex-row gap-4'>
              <ScrollArea className='h-[300px] w-full lg:border-r-2 border-primary-100 pr-4'>
                <NutrientsTable
                  nutrients={vitamins}
                  nutrientsItems={vitaminItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
              <NutrientsBarChart
                nutrients={vitamins}
                nutrientsItems={vitaminItems}
                targetUnit='mg'
                requiredNutrients={requiredNutrients}
              />
            </div>
          ) : (
            <p className='text-sm text-neutral-600 font-semibold text-center lg:mt-56'>
              no data available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubnutrientsItem;
