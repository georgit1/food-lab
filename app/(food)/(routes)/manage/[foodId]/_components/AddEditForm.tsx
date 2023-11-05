'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Food,
  MainNutrient,
  Mineral,
  TraceElement,
  Vitamin,
} from '@prisma/client';
import { Brush } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Switch } from '@/components/ui/switch';
import IconHeader from '@/components/IconHeader';
import GeneralForm from './GeneralForm';
import ImageForm from './ImageForm';
import MainNutrientsForm from './MainNutrientsForm';
import MineralsForm from './MineralsForm';
import TraceElementsForm from './TraceElementsForm';
import VitaminsForm from './VitaminsForm';
import { isAdmin } from '@/lib/admin';
import PageHeader from '@/components/PageHeader';

type WholeFood = Food & {
  mainNutrients?: MainNutrient[];
  minerals?: Mineral[];
  traceElements?: TraceElement[];
  vitamins?: Vitamin[];
};

interface GeneralFormProps {
  initialData: WholeFood;
  foodId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  categoryId: z.string({
    required_error: 'Please select a category.',
  }),
  preferences: z.unknown(),
  isCreator: z.boolean(),
  // TODO add zero or below one, also edit error message "or zero"
  calories: z.number().min(1, {
    message: 'Calories must be a positive number',
  }),
  fats: z.number().min(1, {
    message: 'Fats must be a positive number',
  }),
  proteins: z.number().min(1, {
    message: 'Fats must be a positive number',
  }),
  carbohydrates: z.number().min(1, {
    message: 'Carbohydrates must be a positive number',
  }),
  sugar: z.number().min(1, {
    message: 'Sugar must be a positive number',
  }),
  fiber: z.number().min(1, {
    message: 'Fiber must be a positive number',
  }),
  salt: z.number().min(1, {
    message: 'Salt must be a positive number',
  }),
  water: z.number().min(1, {
    message: 'Water must be a positive number',
  }),
  saturated: z
    .number()
    .min(1, {
      message: 'Saturated fats must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  unsaturated: z
    .number()
    .min(1, {
      message: 'Unsaturated fats must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  polyunsaturated: z
    .number()
    .min(1, {
      message: 'Polyunsaturated fats must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  potassium: z
    .number()
    .min(0, {
      message: 'Potassium must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  sodium: z
    .number()
    .min(1, {
      message: 'Sodium must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  calcium: z
    .number()
    .min(1, {
      message: 'Calcium must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  magnesium: z
    .number()
    .min(1, {
      message: 'Magnesium must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  chloride: z
    .number()
    .min(1, {
      message: 'Chloride must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  sulfur: z
    .number()
    .min(1, {
      message: 'Sulfur must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  phosphorus: z
    .number()
    .min(1, {
      message: 'Phosphorus must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  iron: z
    .number()
    .min(1, {
      message: 'Iron must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  fluoride: z
    .number()
    .min(1, {
      message: 'Fluoride must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  copper: z
    .number()
    .min(1, {
      message: 'Copper must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  manganese: z
    .number()
    .min(1, {
      message: 'Manganese must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  selenium: z
    .number()
    .min(1, {
      message: 'Selenium must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  iodine: z
    .number()
    .min(1, {
      message: 'Iodine must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  zinc: z
    .number()
    .min(1, {
      message: 'Zinc must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminA: z
    .number()
    .min(1, {
      message: 'Vitamin A must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB1: z
    .number()
    .min(1, {
      message: 'Vitamin B1 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB2: z
    .number()
    .min(1, {
      message: 'Vitamin B2 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB3: z
    .number()
    .min(1, {
      message: 'Vitamin B3 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB5: z
    .number()
    .min(1, {
      message: 'Vitamin B5 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB6: z
    .number()
    .min(1, {
      message: 'Vitamin B6 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB7: z
    .number()
    .min(1, {
      message: 'Vitamin B7 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB9: z
    .number()
    .min(1, {
      message: 'Vitamin B9 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminB12: z
    .number()
    .min(1, {
      message: 'Vitamin B12 must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminC: z
    .number()
    .min(1, {
      message: 'Vitamin C must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminD: z
    .number()
    .min(1, {
      message: 'Vitamin D must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminE: z
    .number()
    .min(1, {
      message: 'Vitamin E must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
  vitaminK: z
    .number()
    .min(1, {
      message: 'Vitamin K must be a positive number',
    })
    .or(z.nan())
    .or(z.null())
    .optional(),
});

// TODO - calculate characteristics on save
const AddEditForm = ({ initialData, foodId, options }: GeneralFormProps) => {
  const [isFoodCreator, setIsFoodCreator] = useState<boolean>(
    initialData.isCreator
  );
  const currentUser = useSession().data?.user;
  const router = useRouter();

  // flatten food object
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

  // console.log('flatteer', flattenedInitialData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: flattenedInitialData,
  });
  // console.log(initialData);
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.isCreator = isFoodCreator;

    try {
      await axios.patch(`/api/food/${foodId}`, values);
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
            />
            <Label htmlFor='is-creator'>is Creator</Label>
          </div>
        )}
        <Button variant={'outline'} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
            <div className='md:col-span-2'>
              <IconHeader icon={Brush} title='Customize your Food' />
            </div>
            <GeneralForm
              initialData={initialData}
              form={form}
              isSubmitting={isSubmitting}
              options={options}
            />

            <ImageForm initialData={initialData} foodId={initialData?.id} />
            <MainNutrientsForm form={form} isSubmitting={isSubmitting} />
            <MineralsForm form={form} isSubmitting={isSubmitting} />
            <TraceElementsForm form={form} isSubmitting={isSubmitting} />
            <VitaminsForm form={form} isSubmitting={isSubmitting} />

            <div className='flex items-center gap-x-2 my-6 md:col-span-2 md:ml-auto'>
              <Button
                disabled={isSubmitting}
                type='submit'
                className='w-full md:float-right'
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddEditForm;
