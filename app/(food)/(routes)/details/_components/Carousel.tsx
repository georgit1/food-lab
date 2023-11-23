'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

interface CarouselProps {
  imageUrl: string;
  preference: string | null;
}

const Carousel = ({ imageUrl, preference }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    <div key='image' className='h-40 rounded-md'>
      {imageUrl ? (
        <Image src={imageUrl} alt='Food Image' fill className='object-cover' />
      ) : (
        <>
          <Separator />
          <ImageIcon className='text-neutral-400 mx-auto mt-14' size={30} />
        </>
      )}
    </div>,
    <div key='details' className='h-48 p-2 pt-0'>
      <Separator className='mb-2' />
      <h2 className='text-lg text-primary-600 font-semibold'>Preference</h2>
      {preference ? (
        <div className='mt-2 flex gap-1'>
          <span className='rounded-full border text-primary-600 border-primary-600 py-0.5 px-3 text-sm'>
            {preference}
          </span>
        </div>
      ) : (
        <p className='text-sm text-center text-primary-600 mt-8'>
          no preference
        </p>
      )}
    </div>,
  ];

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='relative group'>
      {renderCurrentPage()}
      <div className='absolute -top-3 right-0 flex space-x-1.5 mr-2'>
        <div className='flex space-x-1.5'>
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-1.5 rounded-full cursor-pointer ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      <button
        className={`absolute top-1/2 -translate-y-5 left-2  flex justify-center items-center rounded-full w-6 h-6 bg-primary-200 text-gray-600 opacity-0 ${
          currentIndex > 0 ? 'opacity-100' : ''
        }`}
        onClick={goToPrevSlide}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className={`absolute top-1/2 -translate-y-1 right-2 flex justify-center items-center rounded-full w-6 h-6 bg-primary-200 text-gray-600 opacity-0 ${
          currentIndex < slides.length - 1 ? 'opacity-100' : ''
        }`}
        onClick={goToNextSlide}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );

  function renderCurrentPage() {
    return slides[currentIndex];
  }
};

export default Carousel;
