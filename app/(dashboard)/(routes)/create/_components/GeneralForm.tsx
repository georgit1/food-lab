'use client';

import { Brush } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { IconBadge } from '@/components/IconBadge';
import { Combobox } from '@/components/ui/combobox';

interface GeneralFormProps {
  form: any;
  isSubmitting: boolean;
  options: { label: string; value: string }[];
}

const GeneralForm = ({ form, isSubmitting, options }: GeneralFormProps) => {
  return (
    <>
      <div className='flex items-center gap-x-2'>
        <IconBadge icon={Brush} />
        <h2 className='text-xl text-primary-600 font-semibold'>
          Customize your Food
        </h2>
      </div>
      <div className='flex flex-col mt-3 border bg-primary-50 rounded-md p-4 gap-2'>
        <div className='flex'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary-600 font-semibold'>
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder='Enter title'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary-600 font-semibold'>
                  Category
                </FormLabel>
                <FormControl>
                  <Combobox options={...options} {...field} />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-2'>
          <label className='pill-label' htmlFor='checkbox1'>
            Option 1
          </label>
          <input
            type='checkbox'
            id='checkbox1'
            {...form.register('checkbox1')}
          />
          <label className='pill-label' htmlFor='checkbox2'>
            Option 2
          </label>
          <input
            type='checkbox'
            id='checkbox2'
            {...form.register('checkbox2')}
          />
          <label className='pill-label' htmlFor='checkbox3'>
            Option 3
          </label>
          <input
            type='checkbox'
            id='checkbox3'
            {...form.register('checkbox3')}
          />
        </div>
      </div>
    </>
  );
};

export default GeneralForm;
