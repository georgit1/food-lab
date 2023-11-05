import { Mineral, TraceElement, Vitamin } from '@prisma/client';

import NutrientsBarChart from './NutrientsBarChart';
import NutrientsTable from '@/components/NutrientsTable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface NutrientData {
  [key: string]: number | null;
}

interface SubNutrientsItemProps {
  minerals: Mineral & NutrientData;
  traceElements: TraceElement & NutrientData;
  vitamins: Vitamin & NutrientData;
  requiredNutrients: Record<string, number>;
}

const mineralItems = [
  'potassium',
  'sodium',
  'calcium',
  'magnesium',
  'chloride',
  'sulfur',
  'phosphorus',
];

const traceElementItems = [
  'copper',
  'fluoride',
  'iron',
  'iodine',
  'manganese',
  'zinc',
  'selenium',
];

const vitaminItems = [
  'vitaminA',
  'vitaminB1',
  'vitaminB2',
  'vitaminB3',
  'vitaminB5',
  'vitaminB6',
  'vitaminB7',
  'vitaminB9',
  'vitaminB12',
  'vitaminC',
  'vitaminD',
  'vitaminE',
  'vitaminK',
];

const SubNutrientsItem = ({
  minerals,
  traceElements,
  vitamins,
  requiredNutrients,
}: SubNutrientsItemProps) => {
  const allMineralsNull = mineralItems.every(
    (mineral) => minerals[mineral] === null
  );
  const allTraceElementsNull = traceElementItems.every(
    (traceElement) => traceElements[traceElement] === null
  );
  const allVitaminsNull = vitaminItems.every(
    (vitamin) => vitamins[vitamin] === null
  );

  return (
    <div className='row-span-3 col-span-3 order-6 lg:order-3 bg-primary-50 rounded-md p-2 overflow-hidden'>
      <Tabs defaultValue='account'>
        <TabsList className='w-full'>
          <TabsTrigger value='minerals'>Minerals</TabsTrigger>
          <TabsTrigger value='traceElements'>Trace Elements</TabsTrigger>
          <TabsTrigger value='vitamins'>Vitamins</TabsTrigger>
        </TabsList>
        <TabsContent value='minerals'>
          {!allMineralsNull ? (
            <>
              <NutrientsBarChart
                nutrients={minerals}
                nutrientsItems={mineralItems}
                targetUnit='mg'
              />
              <ScrollArea className='h-[300px]'>
                <NutrientsTable
                  nutrients={minerals}
                  nutrientsItems={mineralItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
            </>
          ) : (
            <p className='text-sm text-neutral-600 font-semibold text-center lg:mt-56'>
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value='traceElements'>
          {!allTraceElementsNull ? (
            <>
              <NutrientsBarChart
                nutrients={traceElements}
                nutrientsItems={traceElementItems}
                targetUnit='mg'
              />
              <ScrollArea className='h-[300px]'>
                <NutrientsTable
                  nutrients={traceElements}
                  nutrientsItems={traceElementItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>{' '}
            </>
          ) : (
            <p className='text-sm text-neutral-600 font-semibold text-center lg:mt-56'>
              no data available
            </p>
          )}
        </TabsContent>
        <TabsContent value='vitamins'>
          {!allVitaminsNull ? (
            <>
              <NutrientsBarChart
                nutrients={vitamins}
                nutrientsItems={vitaminItems}
                targetUnit='mg'
              />
              <ScrollArea className='h-[300px]'>
                <NutrientsTable
                  nutrients={vitamins}
                  nutrientsItems={vitaminItems}
                  requiredNutrients={requiredNutrients}
                />
              </ScrollArea>
            </>
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

export default SubNutrientsItem;
