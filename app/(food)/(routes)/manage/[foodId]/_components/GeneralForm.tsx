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
import { useEffect, useState } from 'react';
import PillCheckbox from '@/components/PillCheckbox';
import { preferences } from '@/constants/preferences';

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
  const [selectedPreference, setSelectedPreference] = useState<string | null>(
    initialData?.preference || null
  );

  useEffect(() => {
    // Update form value whenever selectedPreference changes
    form.setValue('preference', selectedPreference);
  }, [selectedPreference, form]);

  const handlePreferenceChange = (preference: string) => {
    setSelectedPreference((prevPreference) => {
      if (prevPreference === preference) {
        return null;
      } else {
        return preference;
      }
    });
  };

  return (
    <div className='flex flex-col border bg-primary-50 rounded-md p-4 gap-2'>
      <div className='flex flex-col sm:flex-row gap-3'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
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
        <FormField
          control={form.control}
          name='categoryId'
          render={({ field }) => (
            <FormItem className=' w-full'>
              <FormLabel className='text-primary-800 font-semibold'>
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
      <div className='mt-5'>
        <div>
          <FormLabel className='text-primary-800 font-semibold'>
            Preferences
          </FormLabel>
          <div className='flex whitespace-nowrap overflow-x-auto sm:flex sm:items-start sm:flex-wrap gap-1 mt-2'>
            {preferences.map((preference) => (
              <PillCheckbox
                key={preference}
                label={preference}
                checked={selectedPreference === preference}
                onChange={() => handlePreferenceChange(preference)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralForm;
