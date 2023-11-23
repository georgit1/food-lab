'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Brush } from 'lucide-react';

import { isAdmin } from '@/utils/admin';
import { formSchema } from '@/utils/formSchema';
import { WholeFoodWithCategory } from '@/types/types';

import MainNutrientsForm from './MainNutrientsForm';
import GeneralForm from './GeneralForm';
import MineralsForm from './MineralsForm';
import TraceElementsForm from './TraceElementsForm';
import VitaminsForm from './VitaminsForm';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Switch } from '@/components/ui/switch';
import IconHeader from '@/components/IconHeader';
import ImageForm from '@/components/ImageForm';
import PageHeader from '@/components/PageHeader';
import Loader from '@/components/Loader';

interface AddEditFormProps {
  initialData: Omit<WholeFoodWithCategory, 'category'>;
  foodId: string;
  options: { label: string; value: string }[];
}

const parseValuesToNumber = (obj: { [key: string]: any }) => {
  const result = { ...obj };
  const excludedProperties = ['title', 'preference', 'categoryId', 'isCreator'];

  for (const key in result) {
    if (result.hasOwnProperty(key) && !excludedProperties.includes(key)) {
      const value = result[key];

      // Check if the value is a string representation of a number
      if (
        typeof value === 'string' &&
        !isNaN(Number(value.replace(',', '.')))
      ) {
        result[key] = parseFloat(value.replace(',', '.')) || null;
      }
    }
  }

  return result;
};

const AddEditForm = ({ initialData, foodId, options }: AddEditFormProps) => {
  const [isFoodCreator, setIsFoodCreator] = useState<boolean>(
    initialData.isCreator
  );
  const currentUser = useSession().data?.user;
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

  const isCompletedFields = requiredFields.every(Boolean);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: flattenedInitialData,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const parsedValues = parseValuesToNumber(values);
    console.log(parsedValues);

    values.isCreator = isFoodCreator;

    try {
      await axios.patch(`/api/food/${foodId}`, parsedValues);
      toast.success('Food updated');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <PageHeader
          header='Customize Food'
          subtext='fill out as much and accurate as possible'
        />
        {isAdmin(currentUser?.email) && (
          <div className='flex items-center space-x-2'>
            <Switch
              id='is-creator'
              checked={isFoodCreator}
              onCheckedChange={() => setIsFoodCreator((c) => !c)}
              className='w-md'
            />
            <Label htmlFor='is-creator'>is Creator</Label>
          </div>
        )}
        <Button
          disabled={!isCompletedFields}
          variant={'outline'}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mt-16'>
            <div className='md:col-span-2 -mb-4'>
              <IconHeader
                icon={Brush}
                title='Customize your Food'
                size={'md'}
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
              label='Food'
            />
            <MainNutrientsForm form={form} isSubmitting={isSubmitting} />
            <MineralsForm form={form} isSubmitting={isSubmitting} />
            <TraceElementsForm form={form} isSubmitting={isSubmitting} />
            <VitaminsForm form={form} isSubmitting={isSubmitting} />

            <div className='flex items-center gap-x-2 my-6 md:col-span-2 md:ml-auto'>
              <Button
                disabled={isSubmitting}
                type='submit'
                className='w-full md:float-right md:w-[80px] bg-primary-800'
              >
                {isSubmitting ? <Loader /> : 'Save'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddEditForm;

// TODO
// size of switch
// loader
