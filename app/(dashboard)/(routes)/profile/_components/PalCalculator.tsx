'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Info } from 'lucide-react';
import { Gender, User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import PalForm from './PalForm';
import BiometricForm from './BiometricForm';
import Loader from '@/components/Loader';

interface CalculatorProps {
  userData: User;
  onClose: () => void;
}

type HoursData = {
  hours_sleep: number;
  hours_profession: number;
  hours_sport: number;
  hours_leisure_time: number;
};

const formSchema = z.object({
  // gender: z.string().min(1, { message: 'Gender is required' }),
  gender: z.nativeEnum(Gender),
  age: z.number().min(1, { message: 'Age is required' }),
  height: z.number().min(1, { message: 'Height is required' }),
  weight: z.number().min(1, { message: 'Weight is required' }),
  hours_sleep: z.number().min(1),
  hours_sleep_select: z.string({
    required_error: 'Please select an option.',
  }),
  hours_profession: z.number().min(1),
  hours_profession_select: z.string({
    required_error: 'Please select an option.',
  }),
  hours_sport: z.number().min(1),
  hours_sport_select: z.string({
    required_error: 'Please select an option.',
  }),
  hours_leisure_time: z.number().min(1),
  hours_leisure_time_select: z.string({
    required_error: 'Please select an option.',
  }),
});
// TODO - try this way
// .refine(
//   (data) => {
//     console.log(data);
//     const sum =
//       data.hours_sleep +
//       data.hours_profession +
//       data.hours_sport +
//       data.hours_leisure_time;

//     return sum === 24;
//   },
//   {
//     message: 'Hours must sum up to 24',
//   }
// );

const PalCalculator = ({ userData, onClose }: CalculatorProps) => {
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const defaultValues = {
    // gender: userData?.gender ?? '',
    gender: userData.gender ?? Gender.MALE,
    age: userData?.age ?? 0,
    height: userData?.height ?? 0,
    weight: userData?.weight ?? 0,
    hours_sleep: userData.hours_sleep ?? 0,
    hours_sleep_select: userData.hours_sleep_select ?? '0.95',
    hours_profession: userData.hours_profession ?? 0,
    hours_profession_select: userData.hours_profession_select ?? '1.45',
    hours_sport: userData.hours_sport ?? 0,
    hours_sport_select: userData.hours_sport_select ?? '1.65',
    hours_leisure_time: userData.hours_leisure_time ?? 0,
    hours_leisure_time_select: userData.hours_leisure_time_select ?? '1.45',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const sum =
      values.hours_sleep +
      values.hours_profession +
      values.hours_sport +
      values.hours_leisure_time;

    if (sum !== 24) {
      setError(true);
    } else {
      let rmr;
      if (values.gender === 'MALE') {
        rmr = 10 * values.weight + 6.25 * values.height - 5 * values.age + 5;
      }

      if (values.gender === 'FEMALE') {
        rmr = 10 * values.weight + 6.25 * values.height - 5 * values.age - 161;
      }

      const pal =
        (values.hours_sleep * parseFloat(values.hours_sleep_select) +
          values.hours_profession * parseFloat(values.hours_profession_select) +
          values.hours_sport * parseFloat(values.hours_sport_select) +
          values.hours_leisure_time *
            parseFloat(values.hours_leisure_time_select)) /
        24;

      setError(false);
      try {
        await axios.patch(`/api/users/${userData.id}`, { ...values, rmr, pal });
        toast.success('Updated data');
        onClose();
        router.refresh();
      } catch {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <BiometricForm form={form} isSubmitting={isSubmitting} />
        <PalForm form={form} isSubmitting={isSubmitting} />
        {error && (
          <p className='flex items-center gap-1 text-red-500 text-sm'>
            <Info size={18} />
            <span>hours must sum up to 24</span>
          </p>
        )}
        <Button
          disabled={isSubmitting}
          type='submit'
          className='w-full mt-6 bg-primary-800'
        >
          {isSubmitting ? <Loader /> : 'Calculate'}
        </Button>
      </form>
    </Form>
  );
};

export default PalCalculator;
