'use client';

import axios from 'axios';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModalStore';
import { useMeal } from '@/context/mealContext';
import Loader from '../Loader';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

const CreateMealModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { clearAll } = useMeal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'createMeal';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '' },
  });

  const { isSubmitting } = form.formState;

  // if modal got triggeread on 'save meal' it presets the meal entries
  // to the current chosen entries
  // const initiateMealEntries = () => {
  //   // clear whole mealEntries
  //   clearAll();

  //   // set for every foodItem the correct originalValuue object
  //   // coming from calculator context (can't set directly through addMealEntry
  //   // because quantity could be already changed)
  //   foodData?.forEach((food) => {
  //     const originalValue = originalValues[food.id];
  //     console.log(originalValue.id, originalValue);
  //     setOriginalValues((prevValues) => ({
  //       ...prevValues,
  //       [originalValue.id]: { ...originalValue },
  //     }));
  //   });

  //   // set the meal entries to the whole food array
  //   setMealEntries(foodData || []);
  // };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // clearAll();
      const response = await axios.post('/api/meal', values);

      router.push(`/meal/${response.data.id}`);
      onClose();
      router.refresh();
      form.reset();
      toast.success('Meal added');
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-primary-800'>
            Create a new meal
          </DialogTitle>
          <DialogDescription className='text-neutral-500'>
            Set a title and click save
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
            <div className='flex items-center gap-x-2 mt-6'>
              <Button
                disabled={isSubmitting}
                type='submit'
                className='w-full sm:w-[80px] sm:ml-auto bg-primary-600'
              >
                {isSubmitting ? <Loader /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMealModal;
