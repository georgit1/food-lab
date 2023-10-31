import IconHeader from '@/components/IconHeader';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Fingerprint } from 'lucide-react';

interface BiometricFormProps {
  form: any;
  isSubmitting: boolean;
}

const gender = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
];

const BiometricForm = ({ form, isSubmitting }: BiometricFormProps) => {
  return (
    <>
      <IconHeader icon={Fingerprint} title='Biometric Profile' />

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 mt-3'>
        <FormField
          control={form.control}
          name='gender'
          render={({ field }) => (
            <FormItem className=' w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Gender
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a Gender' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gender.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Age
              </FormLabel>
              <FormControl>
                <Input
                  type='string'
                  disabled={isSubmitting}
                  placeholder='Enter age'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    field.onChange(parsedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='height'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Height
              </FormLabel>
              <FormControl>
                <Input
                  unit='cm'
                  disabled={isSubmitting}
                  placeholder='Enter height'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    field.onChange(parsedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='weight'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-primary-600 font-semibold'>
                Weight
              </FormLabel>
              <FormControl>
                <Input
                  unit='kg'
                  disabled={isSubmitting}
                  placeholder='Enter weight'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const parsedValue = parseFloat(e.target.value);
                    field.onChange(parsedValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default BiometricForm;
