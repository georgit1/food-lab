'use client';

import { Sprout } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import IconHeader from '@/components/IconHeader';

interface GeneralFormProps {
  form: any;
  isSubmitting: boolean;
}

const MineralsForm = ({ form, isSubmitting }: GeneralFormProps) => {
  return (
    <div>
      <IconHeader icon={Sprout} title='Minerals' size={'md'} />

      <div className='grid sm:grid-cols-2 border bg-primary-50 rounded-md p-4 gap-2 mt-5'>
        <FormField
          control={form.control}
          name='potassium'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Potassium
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter potassium'
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
          name='sodium'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Sodium
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter sodium'
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
          name='calcium'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Calcium
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter calcium'
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
          name='magnesium'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Magnesium
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter magnesium'
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
          name='chloride'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Chloride
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter chloride'
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
          name='sulfur'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Sulfur
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter sulfur'
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
          name='phosphorus'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
                Phosphorus
              </FormLabel>
              <FormControl>
                <Input
                  unit='mg'
                  disabled={isSubmitting}
                  placeholder='Enter phosphorus'
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

export default MineralsForm;
