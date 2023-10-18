'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import GeneralForm from './GeneralForm';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Food } from '@prisma/client';
import { ImageForm } from './ImageForm';

interface GeneralFormProps {
  initialData?: Food;
  foodId?: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  categoryId: z.string().min(1),
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

const AddEditForm = ({ initialData, foodId, options }: GeneralFormProps) => {
  // TODO
  const isEditSession = Boolean(foodId);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValue: initialData
    defaultValues: {
      categoryId: initialData?.categoryId,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   if (isEditSession) {
    //     await axios.patch(`/api/food/${foodId}`, values);
    //   } else {
    //     await axios.post('/api/food/', values);
    //   }

    //   toast.success('Food Created');
    //   router.refresh();
    // } catch {
    //   toast.error('Something went wrong');
    // }
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl text-neutral-800 font-semibold'>
            {isEditSession ? 'Edit' : 'Create a'} Food
          </h1>
          <span className='text-sm text-neutral-500'>
            fill out as much and accurate as possible
          </span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid grid-rows-1 gap-2'
            >
              <GeneralForm
                form={form}
                isSubmitting={isSubmitting}
                options={options}
              />

              <ImageForm initialData={initialData} foodId={initialData?.id} />

              <div className='flex items-center gap-x-2'>
                <Button disabled={!isValid || isSubmitting} type='submit'>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddEditForm;