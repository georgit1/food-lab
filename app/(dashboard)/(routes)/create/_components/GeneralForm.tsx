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
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GeneralFormProps {
  form: any;
  isSubmitting: boolean;
  options: { label: string; value: string }[];
}

const GeneralForm = ({ form, isSubmitting, options }: GeneralFormProps) => {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

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
    <div>
      <div className='flex items-center gap-x-2'>
        <IconBadge icon={Brush} />
        <h2 className='text-xl text-primary-600 font-semibold'>
          Customize your Food
        </h2>
      </div>
      <div className='flex flex-col mt-3 border bg-primary-50 rounded-md p-4 gap-2'>
        <div className='flex gap-3'>
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
              <FormItem>
                <FormLabel className='text-primary-600 font-semibold'>
                  Category
                </FormLabel>
                <FormControl>
                  <Combobox
                    options={...options}
                    {...field}
                    value={field.value || undefined}
                  />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )}
          />
        </div>
        {/* ######## */}
        <div>
          <FormLabel className='text-primary-600 font-semibold'>
            Preferences
          </FormLabel>
          <div className='flex whitespace-nowrap overflow-x-auto mt-3'>
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
        {/* TODO preset pills on edit */}
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

        {/* <input type='hidden' name='preferences' ref={form.register} /> */}

        {/* ######## */}
      </div>
    </div>
  );
};

export default GeneralForm;

interface PillCheckBoxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const PillCheckbox = ({ label, checked, onChange }: PillCheckBoxProps) => {
  return (
    // <label className='relative rounded-full border border-primary-500 flex items-center mx-2 py-1 px-3 text-sm cursor-pointer'>
    <label
      className={cn(
        'relative rounded-full border text-primary-600 border-primary-600 flex items-center mx-2 py-1 px-3 text-sm cursor-pointer',
        checked && 'border-2 font-semibold'
      )}
    >
      {label}
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='absolute h-0 w-0 opacity-0'
      />
    </label>
  );
};

{
  /* <p className={cn(
  "text-sm mt-2",
  !initialData.categoryId && "text-slate-500 italic"
)}> */
}
