'use client';

import { Microscope } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import IconBadge from '@/components/IconBadge';
import IconHeader from '@/components/IconHeader';

interface GeneralFormProps {
  form: any;
  isSubmitting: boolean;
}

const TraceElementsForm = ({ form, isSubmitting }: GeneralFormProps) => {
  return (
    <div>
      <IconHeader icon={Microscope} title='Trace Elements' size={'md'} />

      <div className='grid sm:grid-cols-2 border bg-primary-50 rounded-md p-4 gap-2 mt-5'>
        <FormField
          control={form.control}
          name='iron'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Iron
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter iron'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fluoride'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Fluoride
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter fluoride'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='copper'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Copper
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter copper'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='manganese'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Manganese
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter manganese'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='selenium'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Selenium
              </FormLabel>
              <FormControl>
                <Input
                  unit='µg'
                  disabled={isSubmitting}
                  placeholder='Enter selenium'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='iodine'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Iodine
              </FormLabel>
              <FormControl>
                <Input
                  unit='µg'
                  disabled={isSubmitting}
                  placeholder='Enter iodine'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='zinc'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Zinc
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter zinc'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default TraceElementsForm;
