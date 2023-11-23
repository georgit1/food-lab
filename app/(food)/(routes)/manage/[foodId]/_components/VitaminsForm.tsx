'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Citrus } from 'lucide-react';

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

const VitaminsForm = ({ form, isSubmitting }: GeneralFormProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleShowDetails = () => {
    setShowDetails((d) => !d);
  };

  return (
    <div>
      <IconHeader icon={Citrus} title='Vitamins' size={'md'} />

      <div className='border bg-primary-50 rounded-md p-4 mt-5'>
        <div className='grid sm:grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='vitaminA'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin A
                </FormLabel>
                <FormControl>
                  <Input
                    unit='µg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin A'
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
            name='vitaminB1'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin B1
                </FormLabel>
                <FormControl>
                  <Input
                    unit='mg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin B1'
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
            name='vitaminB2'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin B2
                </FormLabel>
                <FormControl>
                  <Input
                    unit='mg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin B2'
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
            name='vitaminB6'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin B6
                </FormLabel>
                <FormControl>
                  <Input
                    unit='mg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin B6'
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
            name='vitaminB12'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin B12
                </FormLabel>
                <FormControl>
                  <Input
                    unit='µg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin B12'
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
            name='vitaminC'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin C
                </FormLabel>
                <FormControl>
                  <Input
                    unit='mg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin C'
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
            name='vitaminE'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin E
                </FormLabel>
                <FormControl>
                  <Input
                    unit='mg'
                    disabled={isSubmitting}
                    placeholder='Enter vitmain E'
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
            name='vitaminK'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Vitamin K
                </FormLabel>
                <FormControl>
                  <Input
                    unit='µg'
                    disabled={isSubmitting}
                    placeholder='Enter vitamin K'
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showDetails && (
            <>
              <FormField
                control={form.control}
                name='vitaminD'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Vitamin D
                    </FormLabel>
                    <FormControl>
                      <Input
                        unit='µg'
                        disabled={isSubmitting}
                        placeholder='Enter vitamin D'
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
                name='vitaminB3'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Vitamin B3
                    </FormLabel>
                    <FormControl>
                      <Input
                        unit='mg'
                        disabled={isSubmitting}
                        placeholder='Enter vitamin B3'
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
                name='vitaminB5'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Vitamin B5
                    </FormLabel>
                    <FormControl>
                      <Input
                        unit='mg'
                        disabled={isSubmitting}
                        placeholder='Enter vitamin B5'
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
                name='vitaminB7'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Vitamin B7
                    </FormLabel>
                    <FormControl>
                      <Input
                        unit='µg'
                        disabled={isSubmitting}
                        placeholder='Enter vitamin B7'
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
                name='vitaminB9'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Vitamin B9
                    </FormLabel>
                    <FormControl>
                      <Input
                        unit='µg'
                        disabled={isSubmitting}
                        placeholder='Enter vitamin B9'
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>

        {/* Uncollapse details */}
        <div className='flex col-span-2 mt-4'>
          <div className='flex flex-col gap-1 content-center mx-auto'>
            <span className='mx-auto text-xs text-primary-600 font-semibold'>
              {showDetails ? 'close' : 'more details'}
            </span>
            <span className='mx-auto' onClick={toggleShowDetails}>
              <IconBadge
                icon={showDetails ? ChevronUp : ChevronDown}
                size='sm'
                className='cursor-pointer'
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VitaminsForm;
