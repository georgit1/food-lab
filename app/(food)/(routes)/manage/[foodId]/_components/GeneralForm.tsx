'use client';

import { Food } from '@prisma/client';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import PillCheckbox from '@/components/PillCheckbox';

interface GeneralFormProps {
  initialData?: Food | null;
  form: any;
  isSubmitting: boolean;
  options: { label: string; value: string }[];
}

const GeneralForm = ({
  initialData,
  form,
  isSubmitting,
  options,
}: GeneralFormProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    initialData?.preferences || []
  );

  const preferences = [
    'vegetarian',
    'vegan',
    'gluten-free',
    'low-carb',
    'paelo',
    'ketogenic',
  ];

  const handleCategoryChange = (category: string) => {
    let updatedPreferences;

    if (selectedPreferences.includes(category)) {
      // remove existing preference
      updatedPreferences = selectedPreferences.filter(
        (item) => item !== category
      );
    } else {
      // add prefernce
      updatedPreferences = [...selectedPreferences, category];
    }

    setSelectedPreferences(updatedPreferences);

    form.setValue('preferences', updatedPreferences);
  };

  return (
    <div className='flex flex-col border bg-primary-50 rounded-md p-4 gap-2'>
      <div className='flex flex-col sm:flex-row gap-3'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder='Enter title'
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <Combobox
                    options={...options}
                    {...field}
                    value={field.value || undefined}
                  /> */}

        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem className=' w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Category
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a Category' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* TODO - only vegan OR vegetarian */}
      <div className='mt-5'>
        <div>
          <FormLabel className='text-primary-600 font-semibold'>
            Preferences
          </FormLabel>
          <div className='flex whitespace-nowrap overflow-x-auto sm:flex sm:items-start sm:flex-wrap gap-1 mt-2'>
            {preferences.map((preference) => (
              <PillCheckbox
                key={preference}
                label={preference}
                checked={selectedPreferences.includes(preference)}
                onChange={() => handleCategoryChange(preference)}
              />
            ))}
          </div>
        </div>

        {/* HIDDEN */}
        <FormField
          control={form.control}
          name='preferences'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='hidden'
                  {...field}
                  value={JSON.stringify(selectedPreferences || [])}
                />
              </FormControl>
              <FormMessage className='text-sm' />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default GeneralForm;
