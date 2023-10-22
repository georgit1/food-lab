'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Food } from '@prisma/client';
import { Brush } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import IconHeader from '@/components/IconHeader';
import GeneralForm from './GeneralForm';
import ImageForm from './ImageForm';
import MainNutrientsForm from './MainNutrientsForm';
import MineralsForm from './MineralsForm';
import TraceElementsForm from './TraceElementsForm';
import VitaminsForm from './VitaminsForm';

interface GeneralFormProps {
  initialData: Food;
  foodId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  categoryId: z.string({
    required_error: 'Please select a category.',
  }),
  preferences: z.unknown(),
  // imageUrl: z.string().min(1, {
  //   message: 'Image is required',
  // }),
  // TODO add zero or below one, also edit error message "or zero"
  calories: z.number().min(0, {
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
    .optional(),
  unsaturated: z
    .number()
    .min(1, {
      message: 'Unsaturated fats must be a positive number',
    })
    .optional(),
  polyunsaturated: z
    .number()
    .min(1, {
      message: 'Polyunsaturated fats must be a positive number',
    })
    .optional(),
  potassium: z
    .number()
    .min(1, {
      message: 'Potassium must be a positive number',
    })
    .optional(),
  sodium: z
    .number()
    .min(1, {
      message: 'Sodium must be a positive number',
    })
    .optional(),
  calcium: z
    .number()
    .min(1, {
      message: 'Calcium must be a positive number',
    })
    .optional(),
  magnesium: z
    .number()
    .min(1, {
      message: 'Water must be a positive number',
    })
    .optional(),
  chloride: z
    .number()
    .min(1, {
      message: 'Chloride must be a positive number',
    })
    .optional(),
  sulfur: z
    .number()
    .min(1, {
      message: 'Sulfur must be a positive number',
    })
    .optional(),
  phosphorus: z
    .number()
    .min(1, {
      message: 'Phosphorus must be a positive number',
    })
    .optional(),
  iron: z
    .number()
    .min(1, {
      message: 'Iron must be a positive number',
    })
    .optional(),
  fluoride: z
    .number()
    .min(1, {
      message: 'Fluoride must be a positive number',
    })
    .optional(),
  copper: z
    .number()
    .min(1, {
      message: 'Copper must be a positive number',
    })
    .optional(),
  manganese: z
    .number()
    .min(1, {
      message: 'Manganese must be a positive number',
    })
    .optional(),
  selenium: z
    .number()
    .min(1, {
      message: 'Selenium must be a positive number',
    })
    .optional(),
  iodine: z
    .number()
    .min(1, {
      message: 'Iodine must be a positive number',
    })
    .optional(),
  zinc: z
    .number()
    .min(1, {
      message: 'Zinc must be a positive number',
    })
    .optional(),
  vitaminA: z
    .number()
    .min(1, {
      message: 'Vitamin A must be a positive number',
    })
    .optional(),
  vitaminB1: z
    .number()
    .min(1, {
      message: 'Vitamin B1 must be a positive number',
    })
    .optional(),
  vitaminB2: z
    .number()
    .min(1, {
      message: 'Vitamin B2 must be a positive number',
    })
    .optional(),
  vitaminB3: z
    .number()
    .min(1, {
      message: 'Vitamin B3 must be a positive number',
    })
    .optional(),
  vitaminB5: z
    .number()
    .min(1, {
      message: 'Vitamin B5 must be a positive number',
    })
    .optional(),
  vitaminB6: z
    .number()
    .min(1, {
      message: 'Vitamin B6 must be a positive number',
    })
    .optional(),
  vitaminB7: z
    .number()
    .min(1, {
      message: 'Vitamin B7 must be a positive number',
    })
    .optional(),
  vitaminB9: z
    .number()
    .min(1, {
      message: 'Vitamin B9 must be a positive number',
    })
    .optional(),
  vitaminB12: z
    .number()
    .min(1, {
      message: 'Vitamin B12 must be a positive number',
    })
    .optional(),
  vitaminC: z
    .number()
    .min(1, {
      message: 'Vitamin C must be a positive number',
    })
    .optional(),
  vitaminD: z
    .number()
    .min(1, {
      message: 'Vitamin D must be a positive number',
    })
    .optional(),
  vitaminE: z
    .number()
    .min(1, {
      message: 'Vitamin E must be a positive number',
    })
    .optional(),
  vitaminK: z
    .number()
    .min(1, {
      message: 'Vitamin K must be a positive number',
    })
    .optional(),
});

const AddEditForm = ({ initialData, foodId, options }: GeneralFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      await axios.patch(`/api/food/${foodId}`, values);
      toast.success('Food updated');
      router.refresh();
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl text-neutral-800 font-semibold'>
            Customize Food
          </h1>
          <span className='text-sm text-neutral-500'>
            fill out as much and accurate as possible
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16'>
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

            <div className='flex items-center gap-x-2 mt-6 float-right'>
              <Button disabled={isSubmitting} type='submit'>
                Save
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEditForm;
