'use client';

import * as z from 'zod';
import axios from 'axios';
import { Pencil, PlusCircle, ImageIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Food } from '@prisma/client';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/file-upload';

interface ImageFormProps {
  initialData: Food;
  foodId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'Image is required',
  }),
});

export const ImageForm = ({ initialData, foodId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  // TODO
  const imageUrl =
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fres.cloudinary.com%2Fsaas-ag%2Fimage%2Fupload%2Fw_1200%2Ch_630%2Cb_white%2Cc_pad%2Cq_auto%2Cf_auto%2Fv1664972437%2Fmpreis%2Fproducts%2Fac8c0f84-00fa-4ae1-8f75-d32e6b9d5973.jpg&tbnid=xSemBSivMSd7qM&vet=12ahUKEwjJ0o30g4CCAxVJOewKHU8YCTgQMygCegQIARB3..i&imgrefurl=https%3A%2F%2Fwww.mpreis.at%2Fshop%2Fp%2Fgala-apfel-ca-1-stueck-503140&docid=OcBCb7YGcW-9xM&w=1200&h=630&q=Apfel&ved=2ahUKEwjJ0o30g4CCAxVJOewKHU8YCTgQMygCegQIARB3';

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   await axios.patch(`/api/food/${foodId}`, values);
    //   toast.success('Course updated');
    //   toggleEdit();
    //   router.refresh();
    // } catch {
    //   toast.error('Something went wrong');
    // }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course image
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancel</>}
          {!isEditing && !imageUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Add an image
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              alt='Upload'
              fill
              className='object-cover rounded-md'
              src={imageUrl}
            />
            {/* <img
              alt='Upload'
              className='object-cover rounded-md'
              src={imageUrl}
            /> */}
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint='foodImage'
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
