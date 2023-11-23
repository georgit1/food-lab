'use client';

import { useState } from 'react';
import { Apple, ChevronDown, ChevronUp } from 'lucide-react';

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

const MainNutrientsForm = ({ form, isSubmitting }: GeneralFormProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleShowDetails = () => {
    setShowDetails((d) => !d);
  };

  return (
    <div>
      <IconHeader icon={Apple} title='Main Nutrients' size={'md'} />

      <div className='border bg-primary-50 rounded-md p-4 mt-5'>
        <div className='grid sm:grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='calories'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Calories
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter calories'
                    {...field}
                    value={field.value || ''}
                    // onChange={(e) => {
                    //   const parsedValue = parseFloat(e.target.value);
                    //   field.onChange(parsedValue);
                    // }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='fats'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Fats
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter fats'
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
            name='proteins'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Proteins
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter proteins'
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
            name='carbohydrates'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Carbohydrates
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter carbohydrates'
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
            name='sugar'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Sugar
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter sugar'
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
            name='fiber'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Fiber
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter fiber'
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
            name='salt'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Salt
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter salt'
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
            name='water'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className='text-primary-800 font-semibold'>
                  Water
                </FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    unit='g'
                    disabled={isSubmitting}
                    placeholder='Enter water'
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
                name='saturated'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Saturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        unit='g'
                        disabled={isSubmitting}
                        placeholder='Enter saturated fats'
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
                name='unsaturated'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Unsaturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        unit='g'
                        disabled={isSubmitting}
                        placeholder='Enter unsaturated fats'
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
                name='polyunsaturated'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-primary-800 font-semibold'>
                      Polyunsaturated Fats
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        unit='g'
                        disabled={isSubmitting}
                        placeholder='Enter polyunsaturated fats'
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

export default MainNutrientsForm;
