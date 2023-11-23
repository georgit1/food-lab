import IconHeader from '@/components/IconHeader';
import {
  FormControl,
  FormField,
  FormItem,
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
import { Activity } from 'lucide-react';

interface PalFormProps {
  form: any;
  isSubmitting: boolean;
}

const hoursSleepOptions = [{ value: 0.95, label: 'sleep' }];
const hoursProfessionOptions = [
  { value: 1.45, label: 'exclusively sitting' },
  { value: 1.65, label: 'partially walking/standing' },
  { value: 1.85, label: 'mostly walking/standing' },
  { value: 2.2, label: 'very physically demanding' },
];
const hoursSportOptions = [
  { value: 1.65, label: 'little exhausting' },
  { value: 1.85, label: 'exhausting' },
  { value: 2.2, label: 'very exhausting' },
];
const hoursLeisureTimeOptions = [
  { value: 1.45, label: 'not exhausting' },
  { value: 1.65, label: 'little exhausting' },
  { value: 1.85, label: 'exhausting' },
  { value: 2.2, label: 'very exhausting' },
];

const PalForm = ({ form, isSubmitting }: PalFormProps) => {
  return (
    <div className='mt-6'>
      <IconHeader icon={Activity} title='Calculate Pal' size={'sm'} />

      <div className='flex flex-col gap-2 p-2 mt-3'>
        <span className='font-semibold text-sm text-primary-800'>Sleep</span>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='hours_sleep'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='string'
                    disabled={isSubmitting}
                    placeholder='hours'
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
            name='hours_sleep_select'
            render={({ field }) => (
              <FormItem className=' w-full'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hoursSleepOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
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
      </div>

      <div className='flex flex-col gap-2 p-2 mt-3'>
        <span className='font-semibold text-sm text-primary-800'>
          Profession
        </span>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='hours_profession'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='string'
                    disabled={isSubmitting}
                    placeholder='hours'
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
            name='hours_profession_select'
            render={({ field }) => (
              <FormItem className=' w-full'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hoursProfessionOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
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
      </div>

      <div className='flex flex-col gap-2 p-2 mt-3'>
        <span className='font-semibold text-sm text-primary-800'>Sport</span>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='hours_sport'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='string'
                    disabled={isSubmitting}
                    placeholder='hours'
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
            name='hours_sport_select'
            render={({ field }) => (
              <FormItem className=' w-full'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hoursSportOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
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
      </div>

      <div className='flex flex-col gap-2 p-2 mt-3'>
        <span className='font-semibold text-sm text-primary-800'>
          Leisure Time
        </span>
        <div className='flex gap-2'>
          <FormField
            control={form.control}
            name='hours_leisure_time'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='string'
                    disabled={isSubmitting}
                    placeholder='hours'
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
            name='hours_leisure_time_select'
            render={({ field }) => (
              <FormItem className=' w-full'>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hoursLeisureTimeOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value.toString()}
                      >
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
      </div>
    </div>
  );
};

export default PalForm;
